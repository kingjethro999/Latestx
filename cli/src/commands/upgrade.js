import { Command } from 'commander';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execa } from 'execa';
import { getNpmLatestVersion } from '../registries/npm.js';
import { calculateDelta } from '../utils/semver.js';
import pc from 'picocolors';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upgradeCommand = new Command('upgrade')
    .description('Update latestx itself to the latest version')
    .action(async () => {
        try {
            const pkg = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf8'));
            const currentVersion = pkg.version;

            console.log(pc.cyan(`\n⬆️  Latestx Self-Update`));
            console.log(pc.gray(`  Current version: v${currentVersion}`));

            const spinner = ora('Checking for updates...').start();
            const latest = await getNpmLatestVersion('latestx');

            if (!latest) {
                spinner.warn('Could not check for latest version (registry unreachable).');
                return;
            }

            const delta = calculateDelta(currentVersion, latest);

            if (delta === 'latest') {
                spinner.succeed(`You're already on the latest version (v${currentVersion}).`);
                return;
            }

            spinner.succeed(`New version available: v${latest} (${delta} update)`);
            console.log(pc.cyan(`\n  Upgrading latestx v${currentVersion} → v${latest}...`));

            const updateSpinner = ora('Installing update...').start();

            try {
                await execa('npm', ['install', '-g', `latestx@${latest}`], { stdio: 'ignore' });
                updateSpinner.succeed(`Successfully upgraded to latestx v${latest}!`);
            } catch {
                updateSpinner.fail('npm global install failed. Trying with sudo...');
                try {
                    await execa('sudo', ['npm', 'install', '-g', `latestx@${latest}`], { stdio: 'inherit' });
                    console.log(pc.green(`\n✔ Successfully upgraded to latestx v${latest}!`));
                } catch (e) {
                    console.error(pc.red(`\n✖ Failed to upgrade. Please run manually:`));
                    console.log(pc.gray(`  npm install -g latestx@${latest}`));
                }
            }

        } catch (error) {
            console.error(pc.red(`\n✖ Error: ${error.message}`));
            process.exit(1);
        }
    });

export default upgradeCommand;
