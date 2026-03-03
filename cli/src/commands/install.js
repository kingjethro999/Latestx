import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { executeInstall } from '../core/updater.js';
import { resolveDependencies } from '../core/resolver.js';
import { findCompatibleVersion } from '../ai/gemini.js';
import { getLatestVersion } from '../registries/index.js';
import pc from 'picocolors';
import ora from 'ora';

const installCommand = new Command('install')
    .argument('<package>', 'The name of the package to install')
    .option('-c, --compatible', 'Use AI to find the most compatible version based on your project dependencies')
    .description('Installs a new package via the detected package manager')
    .action(async (pkg, options) => {
        try {
            const config = await loadConfig(process.cwd());
            console.log(pc.cyan(`\n📦 Installing dependency for ${pc.bold(config.project.name)}`));

            const eco = config.ecosystems[0]; // Focusing on primary ecosystem

            let packageToInstall = pkg;

            if (options.compatible) {
                console.log(pc.gray(`\n  Running context-aware compatibility check for ${pkg}...`));
                const deps = resolveDependencies(process.cwd(), eco);
                const aiAnalysis = await findCompatibleVersion(eco, pkg, deps);

                console.log(pc.cyan('\n🧠 AI Recommendation:'));
                console.log(pc.green(`  ✔ Recommended Version: ${aiAnalysis.version}`));
                console.log(pc.gray(`  ℹ Reason: ${aiAnalysis.reason}\n`));

                packageToInstall = `${pkg}@${aiAnalysis.version}`;
            } else {
                const spinner = ora(`Fetching latest version info for ${pkg}...`).start();
                const latest = await getLatestVersion(eco.language, pkg);

                if (latest) {
                    spinner.succeed(`Found ${pkg} (v${latest})`);
                } else {
                    // If we couldn't resolve exactly, we still allow the native package manager to try 
                    spinner.warn(`Could not verify exact latest version for ${pkg}. Falling back to native package manager.`);
                }
            }

            // Execute Install
            await executeInstall(eco.packageManager, packageToInstall);

        } catch (error) {
            console.error(pc.red(`\n✖ Error: ${error.message}`));
            process.exit(1);
        }
    });

export default installCommand;
