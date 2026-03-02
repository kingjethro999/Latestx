import { Command } from 'commander';
import { analyzeWorkspace } from '../core/analyzer.js';
import { saveConfig } from '../core/config.js';
import pc from 'picocolors';
import ora from 'ora';

const initCommand = new Command('init')
    .description('Runs a full analysis of your workspace and creates latestx.yaml')
    .action(async () => {
        console.log(pc.cyan('\n🚀 Welcome to latestx!'));
        const spinner = ora('Analyzing workspace ecosystems...').start();

        try {
            const analysis = await analyzeWorkspace(process.cwd());
            spinner.succeed('Analysis complete');

            console.log('\n' + pc.bold('Detected Ecosystems:'));
            for (const eco of analysis.ecosystems) {
                console.log(`  - ${pc.green(eco.language)} ${eco.framework ? pc.gray(`(${eco.framework})`) : ''} via ${pc.yellow(eco.packageManager)}`);
            }

            await saveConfig(process.cwd(), analysis);
            console.log(pc.green(`\n✔ Created ${pc.bold('latestx.yaml')} successfully.`));

        } catch (error) {
            spinner.fail('Analysis failed');
            console.error(pc.red(error.message));
            process.exit(1);
        }
    });

export default initCommand;
