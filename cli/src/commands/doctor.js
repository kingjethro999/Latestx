import { Command } from 'commander';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { execa } from 'execa';
import yaml from 'yaml';
import pc from 'picocolors';
import ora from 'ora';
import { loadApiKey } from '../core/auth.js';

const doctorCommand = new Command('doctor')
    .description('Diagnose your latestx setup and environment')
    .action(async () => {
        console.log(pc.cyan('\n🩺 Latestx Doctor\n'));

        let passed = 0;
        let warned = 0;
        let failed = 0;

        // 1. Check latestx.yaml
        const configPath = join(process.cwd(), 'latestx.yaml');
        if (existsSync(configPath)) {
            try {
                const content = readFileSync(configPath, 'utf8');
                const config = yaml.parse(content);
                if (config && config.version && config.ecosystems) {
                    console.log(pc.green('  ✔ latestx.yaml is valid'));
                    passed++;
                } else {
                    console.log(pc.yellow('  ⚠ latestx.yaml exists but may be incomplete'));
                    warned++;
                }
            } catch (e) {
                console.log(pc.red('  ✖ latestx.yaml exists but is not valid YAML'));
                failed++;
            }
        } else {
            console.log(pc.red('  ✖ latestx.yaml not found (run `latestx init`)'));
            failed++;
        }

        // 2. Check package manager availability
        let config;
        try {
            const content = readFileSync(configPath, 'utf8');
            config = yaml.parse(content);
        } catch { }

        if (config && config.ecosystems) {
            for (const eco of config.ecosystems) {
                const pm = eco.packageManager;
                try {
                    await execa('which', [pm]);
                    console.log(pc.green(`  ✔ ${pm} is installed`));
                    passed++;
                } catch {
                    console.log(pc.red(`  ✖ ${pm} is not installed or not in PATH`));
                    failed++;
                }
            }
        }

        // 3. Check registry reachability
        const registryChecks = [
            { name: 'npm (registry.npmjs.org)', url: 'https://registry.npmjs.org/' },
            { name: 'PyPI (pypi.org)', url: 'https://pypi.org/simple/' },
        ];

        for (const reg of registryChecks) {
            try {
                const res = await fetch(reg.url, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
                if (res.ok || res.status === 405) {
                    console.log(pc.green(`  ✔ ${reg.name} is reachable`));
                    passed++;
                } else {
                    console.log(pc.yellow(`  ⚠ ${reg.name} responded with status ${res.status}`));
                    warned++;
                }
            } catch {
                console.log(pc.red(`  ✖ ${reg.name} is unreachable`));
                failed++;
            }
        }

        // 4. Check AI key
        try {
            const key = loadApiKey();
            if (key && key.length > 10) {
                console.log(pc.green('  ✔ AI API key is configured'));
                passed++;
            } else {
                console.log(pc.yellow('  ⚠ AI API key may be invalid'));
                warned++;
            }
        } catch {
            console.log(pc.yellow('  ⚠ Could not verify AI API key'));
            warned++;
        }

        // Summary
        console.log('\n' + pc.bold('Summary:'));
        console.log(`  ${pc.green(`${passed} passed`)}  ${pc.yellow(`${warned} warnings`)}  ${pc.red(`${failed} failed`)}`);

        if (failed > 0) {
            console.log(pc.red('\n⚠ Some checks failed. Fix the issues above to ensure latestx works properly.'));
        } else if (warned > 0) {
            console.log(pc.yellow('\n✔ Environment looks okay with some warnings.'));
        } else {
            console.log(pc.green('\n✨ Everything looks great!'));
        }
    });

export default doctorCommand;
