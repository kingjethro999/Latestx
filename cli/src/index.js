import { Command } from 'commander';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import initCommand from './commands/init.js';
import checkCommand from './commands/check.js';
import updateCommand from './commands/update.js';
import aiCommand from './commands/ai.js';
import installCommand from './commands/install.js';
import configCommand from './commands/config.js';
import cleanCommand from './commands/clean.js';
import logCommand from './commands/log.js';
import listCommand from './commands/list.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
const packageJsonPath = join(__dirname, '../package.json');
const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

const program = new Command();

program
    .name('latestx')
    .description('Universal dependency intelligence and upgrade CLI')
    .version(pkg.version, '-v, --version', 'Output the current version');

// Register commands
program.addCommand(initCommand);
program.addCommand(checkCommand);
program.addCommand(updateCommand);
program.addCommand(aiCommand);
program.addCommand(installCommand);
program.addCommand(configCommand);
program.addCommand(cleanCommand);
program.addCommand(logCommand);
program.addCommand(listCommand);

// Parse arguments
program.parse(process.argv);
