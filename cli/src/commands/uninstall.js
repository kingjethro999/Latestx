import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { executeUninstall } from '../core/updater.js';
import pc from 'picocolors';

const uninstallCommand = new Command('uninstall')
    .argument('<package>', 'The name of the package to uninstall')
    .description('Removes a package via the detected package manager')
    .action(async (pkg) => {
        try {
            const config = await loadConfig(process.cwd());
            console.log(pc.cyan(`\n🗑️  Uninstalling ${pc.bold(pkg)} from ${pc.bold(config.project.name)}`));

            const eco = config.ecosystems[0];
            await executeUninstall(eco.packageManager, pkg);

        } catch (error) {
            console.error(pc.red(`\n✖ Error: ${error.message}`));
            process.exit(1);
        }
    });

export default uninstallCommand;
