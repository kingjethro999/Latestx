import { Command } from 'commander';
import prompts from 'prompts';
import pc from 'picocolors';
import { saveApiKey } from '../core/auth.js';

const aiCommand = new Command('ai')
    .description('Manage AI functionality and authentication')
    .option('--auth', 'Configure your own custom Gemini API Key')
    .action(async (options) => {
        if (options.auth) {
            console.log(pc.cyan('\n🔒 latestx Custom Authentication Setup'));
            console.log(pc.gray('By default, latestx uses a built-in secure key. You can override it here.'));

            const { apiKey } = await prompts({
                type: 'password',
                name: 'apiKey',
                message: 'Enter your custom Gemini API Key',
                validate: value => value.length > 20 || 'Please enter a valid API key'
            });

            if (!apiKey) {
                console.log(pc.red('Operation cancelled.'));
                process.exit(1);
            }

            try {
                saveApiKey(apiKey);
                console.log(pc.green('\n✔ Custom API Key securely encrypted and saved locally.'));
            } catch (e) {
                console.error(pc.red(`\n✖ Error saving API key: ${e.message}`));
            }
        } else {
            console.log(pc.cyan('\n🧠 latestx AI Subsystem'));
            console.log(pc.gray('The AI engine is ready. Run `latestx update --compatibility` to use it.'));
            console.log(pc.gray('To configure a custom API key instead of the built-in one, run:'));
            console.log(pc.white('  latestx ai --auth\n'));
        }
    });

export default aiCommand;
