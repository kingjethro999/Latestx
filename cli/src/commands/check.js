import { Command } from 'commander';
import ora from 'ora';
import pc from 'picocolors';
import prompts from 'prompts';
import { loadConfig } from '../core/config.js';
import { resolveDependencies } from '../core/resolver.js';
import { getLatestVersion } from '../registries/index.js';
import { calculateDelta, getDeltaColor } from '../utils/semver.js';

const checkCommand = new Command('check')
    .description('Checks for latest version of packages')
    .option('--compatibility', 'Runs AI compatibility analysis')
    .option('--non-interactive', 'Output results without prompts')
    .action(async (options) => {
        try {
            const config = await loadConfig(process.cwd());
            console.log(pc.cyan(`\n🔍 Checking updates for ${pc.bold(config.project.name)}`));

            const allUpdates = [];
            const spinner = ora('Resolving dependencies and fetching latest versions...').start();

            for (const eco of config.ecosystems) {
                spinner.text = `Fetching latest versions for ${eco.language} (${eco.packageManager})...`;
                const deps = resolveDependencies(process.cwd(), eco);

                for (const dep of deps) {
                    const latest = await getLatestVersion(eco.language, dep.name);
                    if (latest && latest !== dep.current) {
                        const delta = calculateDelta(dep.current, latest);
                        if (delta !== 'latest' && delta !== 'unknown') {
                            allUpdates.push({
                                ecosystem: eco,
                                name: dep.name,
                                current: dep.current,
                                latest: latest,
                                delta: delta
                            });
                        }
                    }
                }
            }

            spinner.stop();

            if (allUpdates.length === 0) {
                console.log(pc.green('\n✨ All dependencies are up to date!'));
                process.exit(0);
            }

            console.log(`\nFound ${pc.bold(allUpdates.length)} available updates:\n`);

            // Prepare prompt choices
            const choices = allUpdates.map(u => {
                const title = `${u.name.padEnd(30)} ${pc.gray(u.current)}  →  ${getDeltaColor(u.delta, pc)(u.latest.padEnd(10))} ${pc.gray(`[${u.delta}]`)}`;
                return {
                    title,
                    value: u,
                    selected: u.delta !== 'major' // Pre-select safe updates
                };
            });

            if (options.nonInteractive) {
                choices.forEach(c => console.log(`  - ${c.title}`));
                process.exit(0);
            }

            const response = await prompts({
                type: 'multiselect',
                name: 'selectedUpdates',
                message: 'Select packages to update (Space to toggle, Enter to confirm)',
                choices,
                hint: '- Space to select. Use arrows to navigate.',
                instructions: false
            });

            if (!response.selectedUpdates || response.selectedUpdates.length === 0) {
                console.log(pc.yellow('\nNo packages selected for update.'));
                process.exit(0);
            }

            console.log(pc.green(`\n✔ Selected ${response.selectedUpdates.length} packages for update.`));

            // We pass the selection to the subsequent update execution logic (or tell the user to run update)
            console.log(pc.gray('\nRun `latestx update` to apply these updates (or pass them to the updater function).'));
            // In a full implementation, `check` could directly invoke the updater logic if the user opts in.

        } catch (error) {
            console.error(pc.red(`\n✖ Error: ${error.message}`));
            process.exit(1);
        }
    });

export default checkCommand;
