import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';
import pc from 'picocolors';

const listCommand = new Command('list')
    .description('List all installed packages natively via the ecosystem manifest')
    .action(() => {
        try {
            const config = loadConfig(process.cwd());

            if (!config.ecosystems || config.ecosystems.length === 0) {
                console.error(pc.red('No ecosystems found in latestx.yaml. Run `latestx init` first.'));
                process.exit(1);
            }

            const primaryEco = config.ecosystems[0];
            const manifestPath = join(process.cwd(), primaryEco.manifest);

            if (!existsSync(manifestPath)) {
                console.error(pc.red(`Manifest file "${primaryEco.manifest}" not found in current directory.`));
                process.exit(1);
            }

            console.log(pc.cyan(`\n📦 Dependencies via ${primaryEco.manifest} (${primaryEco.packageManager}):\n`));

            let parsedManifest = {};

            // Basic JSON parsing specifically designed to work across formats.
            // Works reliably for package.json and composer.json natively.
            if (primaryEco.manifest.endsWith('.json')) {
                parsedManifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
            }

            const dependencies = parsedManifest.dependencies || {};
            const devDependencies = parsedManifest.devDependencies || parsedManifest['require-dev'] || {};

            const depCount = Object.keys(dependencies).length;
            const devDepCount = Object.keys(devDependencies).length;

            if (depCount > 0) {
                console.log(pc.bold('Regular Dependencies:'));
                for (const [name, version] of Object.entries(dependencies)) {
                    console.log(`  - ${pc.white(name)} ${pc.gray(version)}`);
                }
                console.log();
            }

            if (devDepCount > 0) {
                console.log(pc.bold('Dev Dependencies:'));
                for (const [name, version] of Object.entries(devDependencies)) {
                    console.log(`  - ${pc.white(name)} ${pc.gray(version)}`);
                }
                console.log();
            }

            if (depCount === 0 && devDepCount === 0) {
                console.log(pc.gray('No dependencies found.'));
            } else {
                console.log(pc.green(`✔ Found ${depCount + devDepCount} total packages.`));
            }

        } catch (error) {
            console.error(pc.red(`\nAction Failed: ${error.message}`));
            process.exit(1);
        }
    });

export default listCommand;
