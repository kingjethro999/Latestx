import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { executeUpdate } from '../core/updater.js';
import { analyzeCompatibility } from '../ai/gemini.js';
import { resolveDependencies } from '../core/resolver.js';
import { getLatestVersion } from '../registries/index.js';
import { calculateDelta } from '../utils/semver.js';
import pc from 'picocolors';

const updateCommand = new Command('update')
    .argument('[package]', 'Optional specific package to update')
    .description('Updates dependencies to their latest safe versions')
    .option('-c, --compatibility', 'Restrict updates to compatible bounds using AI')
    .action(async (pkg, options) => {
        try {
            const config = await loadConfig(process.cwd());
            console.log(pc.cyan(`\n🚀 Updating dependencies for ${pc.bold(config.project.name)}`));

            for (const eco of config.ecosystems) {
                console.log(pc.gray(`\n  Scanning ${eco.language} (${eco.packageManager})...`));
                let allUpdates = [];
                const deps = resolveDependencies(process.cwd(), eco);

                if (pkg) {
                    // Single package update
                    const dep = deps.find(d => d.name === pkg);
                    if (!dep) continue; // Package not in this ecosystem, try next

                    const latest = await getLatestVersion(eco.language, pkg);
                    if (latest && latest !== dep.current) {
                        allUpdates.push({ name: pkg, current: dep.current, latest });
                    } else {
                        console.log(pc.green(`\n✨ ${pkg} is already up to date!`));
                        continue;
                    }
                } else {
                    // Bulk update mode
                    for (const dep of deps) {
                        const latest = await getLatestVersion(eco.language, dep.name);
                        if (latest && latest !== dep.current) {
                            allUpdates.push({ name: dep.name, current: dep.current, latest });
                        }
                    }
                }

                if (allUpdates.length === 0) {
                    console.log(pc.green(`  ✨ All ${eco.language} dependencies are up to date!`));
                    continue;
                }

                let finalUpdates = allUpdates;

                // Run compatibility analysis if requested
                if (options.compatibility) {
                    const aiAnalysis = await analyzeCompatibility(eco, allUpdates);

                    console.log(pc.cyan('\n🧠 AI Compatibility Report:'));
                    console.log(pc.gray(aiAnalysis.advisory));

                    if (aiAnalysis.blockedPackages && aiAnalysis.blockedPackages.length > 0) {
                        console.log(pc.red('\nBlocked Updates:'));
                        aiAnalysis.blockedPackages.forEach(b => {
                            console.log(`  ✖ ${b.name}: ${pc.gray(b.reason)}`);
                        });
                    }

                    finalUpdates = allUpdates.filter(u => aiAnalysis.safeToUpdate.includes(u.name));
                }

                if (finalUpdates.length === 0) {
                    console.log(pc.yellow('\nNo safe updates available after compatibility checks.'));
                    continue;
                }

                // Execute Updates
                await executeUpdate(eco.packageManager, finalUpdates);
            }

        } catch (error) {
            console.error(pc.red(`\n✖ Error: ${error.message}`));
            process.exit(1);
        }
    });

export default updateCommand;

