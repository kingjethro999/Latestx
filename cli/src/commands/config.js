import { Command } from 'commander';
import { loadConfig, writeConfig } from '../core/config.js';
import pc from 'picocolors';

const configCommand = new Command('config')
    .description('Manage the latestx.yaml configuration file');

configCommand
    .command('list')
    .description('Print the entire configuration')
    .action(() => {
        try {
            const config = loadConfig(process.cwd());
            console.log(JSON.stringify(config, null, 2));
        } catch (error) {
            console.error(pc.red(error.message));
            process.exit(1);
        }
    });

configCommand
    .command('get <key>')
    .description('Get a configuration value using dot notation (e.g. preferences.interactive_default)')
    .action((key) => {
        try {
            const config = loadConfig(process.cwd());
            const value = getNestedProperty(config, key);

            if (value === undefined) {
                console.log(pc.yellow(`Key "${key}" not found in configuration.`));
            } else {
                console.log(value);
            }
        } catch (error) {
            console.error(pc.red(error.message));
            process.exit(1);
        }
    });

import prompts from 'prompts';

configCommand
    .command('set <key> <value>')
    .description('Set a configuration value using dot notation (e.g. preferences.interactive_default false)')
    .action((key, value) => {
        try {
            const config = loadConfig(process.cwd());

            // Convert string values to boolean/numbers if applicable
            let parsedValue = value;
            if (value === 'true') parsedValue = true;
            else if (value === 'false') parsedValue = false;
            else if (!isNaN(Number(value))) parsedValue = Number(value);

            const success = setNestedProperty(config, key, parsedValue);
            if (!success) {
                console.error(pc.red(`Failed to set "${key}". Nested path might be invalid.`));
                process.exit(1);
            }

            writeConfig(process.cwd(), config);
            console.log(pc.green(`✔ Updated "${key}" to ${parsedValue}`));
        } catch (error) {
            console.error(pc.red(error.message));
            process.exit(1);
        }
    });

configCommand
    .command('edit')
    .description('Interactively edit the latestx.yaml configuration')
    .action(async () => {
        try {
            const config = loadConfig(process.cwd());

            console.log(pc.cyan('\n⚙ Interactive Configuration Editor\n'));

            const preferences = config.preferences || {};
            const keys = Object.keys(preferences);

            if (keys.length === 0) {
                console.log(pc.yellow('No preferences found to edit.'));
                return;
            }

            const questions = keys.map(key => {
                const val = preferences[key];
                const isBool = typeof val === 'boolean';

                return {
                    type: isBool ? 'toggle' : 'text',
                    name: key,
                    message: `Set ${key}`,
                    initial: isBool ? val : String(val),
                    active: isBool ? 'yes' : undefined,
                    inactive: isBool ? 'no' : undefined
                };
            });

            const response = await prompts(questions);

            // Check if user cancelled
            if (Object.keys(response).length !== keys.length) {
                console.log(pc.gray('\nConfiguration edit cancelled.'));
                return;
            }

            config.preferences = { ...config.preferences, ...response };
            writeConfig(process.cwd(), config);

            console.log(pc.green('\n✔ Configuration saved successfully!'));

        } catch (error) {
            console.error(pc.red(`\nAction Failed: ${error.message}`));
            process.exit(1);
        }
    });

// Utility to get a nested property from an object using a dot-separated string
function getNestedProperty(obj, path) {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
        if (current === undefined || current === null) return undefined;
        current = current[key];
    }
    return current;
}

// Utility to set a nested property on an object using a dot-separated string
function setNestedProperty(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();

    let current = obj;
    for (const key of keys) {
        if (current[key] === undefined || current[key] === null) {
            current[key] = {}; // Create nested object if it doesn't exist
        }
        current = current[key];
    }

    current[lastKey] = value;
    return true;
}

export default configCommand;
