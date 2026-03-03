import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { executeClean } from '../core/updater.js';
import { log } from '../core/logger.js';
import pc from 'picocolors';

const cleanCommand = new Command('clean')
    .description('Clean the package manager cache')
    .action(async () => {
        try {
            const config = loadConfig(process.cwd());

            if (!config.ecosystems || config.ecosystems.length === 0) {
                console.error(pc.red('No ecosystems found in latestx.yaml. Run `latestx init` first.'));
                process.exit(1);
            }

            log('Clean cache started', 'INFO');
            const primaryPackageManager = config.ecosystems[0].packageManager;

            const success = await executeClean(primaryPackageManager);
            if (success) {
                log(`Cleaned cache successfully via ${primaryPackageManager}`, 'INFO');
            }
        } catch (error) {
            log(`Clean cache failed: ${error.message}`, 'ERROR');
            console.error(pc.red(`\nAction Failed: ${error.message}`));
            process.exit(1);
        }
    });

export default cleanCommand;
