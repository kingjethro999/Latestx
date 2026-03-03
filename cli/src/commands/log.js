import { Command } from 'commander';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import pc from 'picocolors';

const logCommand = new Command('log')
    .description('View the latestx execution logs')
    .option('-l, --lines <number>', 'Number of lines to output', parseInt, 100)
    .action((options) => {
        try {
            const logFilePath = join(process.cwd(), 'latestx.log');

            if (!existsSync(logFilePath)) {
                console.log(pc.yellow('No log file found. Execute some commands first.'));
                return;
            }

            const content = readFileSync(logFilePath, 'utf8');
            const lines = content.trim().split('\n');
            const linesToPrint = lines.slice(-options.lines);

            const limitedOutput = lines.length > options.lines ?
                pc.gray(`\n... showing last ${options.lines} lines of ${lines.length} total lines ...\n`) : '';

            console.log(limitedOutput + linesToPrint.join('\n'));
        } catch (error) {
            console.error(pc.red(`Failed to read logs: ${error.message}`));
            process.exit(1);
        }
    });

export default logCommand;
