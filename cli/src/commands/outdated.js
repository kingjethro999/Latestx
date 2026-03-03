import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { resolveDependencies } from '../core/resolver.js';
import { getLatestVersion } from '../registries/index.js';
import { calculateDelta, getDeltaColor } from '../utils/semver.js';
import { formatJsonOutput } from '../utils/formatters.js';
import ora from 'ora';
import pc from 'picocolors';

const outdatedCommand = new Command('outdated')
    .description('Generate a report of outdated dependencies (non-interactive)')
    .option('--format <type>', 'Output format: table (default), json, markdown', 'table')
    .action(async (options) => {
        try {
            const config = await loadConfig(process.cwd());
            const spinner = ora('Scanning for outdated dependencies...').start();

            const allUpdates = [];

            for (const eco of config.ecosystems) {
                spinner.text = `Checking ${eco.language} (${eco.packageManager})...`;
                const deps = resolveDependencies(process.cwd(), eco);

                for (const dep of deps) {
                    const latest = await getLatestVersion(eco.language, dep.name);
                    if (latest && latest !== dep.current) {
                        const delta = calculateDelta(dep.current, latest);
                        if (delta !== 'latest' && delta !== 'unknown') {
                            allUpdates.push({
                                ecosystem: eco.language,
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

            const format = options.format.toLowerCase();

            if (format === 'json') {
                console.log(formatJsonOutput(config, allUpdates));
            } else if (format === 'markdown') {
                console.log(formatMarkdown(config, allUpdates));
            } else {
                // Default: styled terminal table
                console.log(`\n${pc.bold(`Outdated Dependencies for ${config.project.name}`)}\n`);
                console.log(`  ${'Package'.padEnd(30)} ${'Current'.padEnd(12)} ${'Latest'.padEnd(12)} ${'Risk'}`);
                console.log(`  ${'─'.repeat(30)} ${'─'.repeat(12)} ${'─'.repeat(12)} ${'─'.repeat(8)}`);

                for (const u of allUpdates) {
                    const colorFn = getDeltaColor(u.delta, pc);
                    console.log(`  ${u.name.padEnd(30)} ${pc.gray(u.current.padEnd(12))} ${colorFn(u.latest.padEnd(12))} ${pc.gray(`[${u.delta}]`)}`);
                }

                console.log(`\n  ${pc.bold(`Total: ${allUpdates.length} outdated`)}`);
            }

        } catch (error) {
            console.error(pc.red(`\n✖ Error: ${error.message}`));
            process.exit(1);
        }
    });

function formatMarkdown(config, updates) {
    let md = `# Outdated Dependencies Report\n\n`;
    md += `**Project:** ${config.project.name}\n`;
    md += `**Generated:** ${new Date().toISOString()}\n\n`;
    md += `| Package | Current | Latest | Risk |\n`;
    md += `|---------|---------|--------|------|\n`;

    for (const u of updates) {
        md += `| ${u.name} | ${u.current} | ${u.latest} | ${u.delta} |\n`;
    }

    md += `\n**Total:** ${updates.length} outdated dependencies\n`;
    return md;
}

export default outdatedCommand;
