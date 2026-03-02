import { execa } from 'execa';
import ora from 'ora';
import pc from 'picocolors';

export async function executeUpdate(packageManager, dependencies) {
    const spinner = ora(`Updating ${dependencies.length} packages via ${packageManager}...`).start();

    try {
        const packagesToUpdate = dependencies.map(d => `${d.name}@latest`);
        let command = '';
        let args = [];

        switch (packageManager) {
            case 'npm':
                command = 'npm';
                args = ['install', ...packagesToUpdate];
                break;
            case 'yarn':
                command = 'yarn';
                args = ['add', ...packagesToUpdate];
                break;
            case 'pnpm':
                command = 'pnpm';
                args = ['install', ...packagesToUpdate];
                break;
            case 'bun':
                command = 'bun';
                args = ['add', ...packagesToUpdate];
                break;
            case 'pip':
                command = 'pip';
                args = ['install', '--upgrade', ...packagesToUpdate.map(p => p.split('@')[0])];
                break;
            case 'cargo':
                command = 'cargo';
                args = ['update', ...packagesToUpdate.map(p => ['-p', p.split('@')[0]]).flat()];
                break;
            case 'composer':
                command = 'composer';
                args = ['require', ...dependencies.map(d => d.name)];
                break;
            default:
                throw new Error(`Package manager ${packageManager} is not currently supported for automated updates.`);
        }

        // Execute the native command
        await execa(command, args, { stdio: 'ignore' });
        spinner.succeed(`Successfully updated ${dependencies.length} packages.`);
        return true;

    } catch (error) {
        spinner.fail(`Failed to update packages using ${packageManager}`);
        throw error;
    }
}

export async function executeInstall(packageManager, packageName) {
    const spinner = ora(`Installing ${packageName} via ${packageManager}...`).start();

    try {
        let command = '';
        let args = [];

        switch (packageManager) {
            case 'npm':
                command = 'npm';
                args = ['install', packageName];
                break;
            case 'yarn':
                command = 'yarn';
                args = ['add', packageName];
                break;
            case 'pnpm':
                command = 'pnpm';
                args = ['install', packageName];
                break;
            case 'bun':
                command = 'bun';
                args = ['add', packageName];
                break;
            case 'pip':
                command = 'pip';
                args = ['install', packageName];
                break;
            case 'cargo':
                command = 'cargo';
                args = ['add', packageName];
                break;
            case 'composer':
                command = 'composer';
                args = ['require', packageName];
                break;
            default:
                throw new Error(`Package manager ${packageManager} is not currently supported for automated installs.`);
        }

        // Execute the native command
        await execa(command, args, { stdio: 'ignore' });
        spinner.succeed(`Successfully installed ${packageName}.`);
        return true;

    } catch (error) {
        spinner.fail(`Failed to install ${packageName} using ${packageManager}`);
        throw error;
    }
}
