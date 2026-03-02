import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { executeInstall } from '../core/updater.js';
import { getLatestVersion } from '../registries/index.js';
import pc from 'picocolors';
import ora from 'ora';

const installCommand = new Command('install')
    .argument('<package>', 'The name of the package to install')
    .description('Installs a new package via the detected package manager')
    .action(async (pkg) => {
        try {
            const config = loadConfig(process.cwd());
            console.log(pc.cyan(`\n📦 Installing dependency for ${pc.bold(config.project.name)}`));

            const eco = config.ecosystems[0]; // Focusing on primary ecosystem

            const spinner = ora(`Fetching latest version info for ${pkg}...`).start();
            const latest = await getLatestVersion(eco.language, pkg);

            if (latest) {
                spinner.succeed(`Found ${pkg} (v${latest})`);
            } else {
                // If we couldn't resolve exactly, we still allow the native package manager to try 
                spinner.warn(`Could not verify exact latest version for ${pkg}. Falling back to native package manager.`);
            }

            // Execute Install
            await executeInstall(eco.packageManager, pkg);

        } catch (error) {
            console.error(pc.red(`\n✖ Error: ${error.message}`));
            process.exit(1);
        }
    });

export default installCommand;
