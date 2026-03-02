import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import toml from 'toml';

/**
 * Heuristics for detecting language and package managers
 */
export async function analyzeWorkspace(cwd) {
    const ecosystems = [];
    let projectName = 'unknown-project';

    // JavaScript / TypeScript (Node.js)
    if (existsSync(join(cwd, 'package.json'))) {
        try {
            const pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8'));
            if (pkg.name) projectName = pkg.name;
        } catch (e) { }

        const isReact = existsSync(join(cwd, 'node_modules/react')) || checkFileContains(cwd, 'package.json', '"react"');
        const isNext = existsSync(join(cwd, 'next.config.js')) || checkFileContains(cwd, 'package.json', '"next"');
        const isRN = existsSync(join(cwd, 'android')) && existsSync(join(cwd, 'ios')) && checkFileContains(cwd, 'package.json', '"react-native"');

        let framework = null;
        if (isRN) framework = 'react-native';
        else if (isNext) framework = 'nextjs';
        else if (isReact) framework = 'react';
        else framework = 'node';

        let pm = 'npm';
        if (existsSync(join(cwd, 'yarn.lock'))) pm = 'yarn';
        else if (existsSync(join(cwd, 'pnpm-lock.yaml'))) pm = 'pnpm';
        else if (existsSync(join(cwd, 'bun.lockb'))) pm = 'bun';

        ecosystems.push({
            language: 'javascript',
            framework,
            packageManager: pm,
            manifest: 'package.json',
            lockfile: pm === 'yarn' ? 'yarn.lock' : pm === 'pnpm' ? 'pnpm-lock.yaml' : pm === 'bun' ? 'bun.lockb' : 'package-lock.json'
        });
    }

    // Python
    if (existsSync(join(cwd, 'requirements.txt'))) {
        ecosystems.push({ language: 'python', framework: null, packageManager: 'pip', manifest: 'requirements.txt', lockfile: null });
    } else if (existsSync(join(cwd, 'pyproject.toml'))) {
        try {
            const parsed = toml.parse(readFileSync(join(cwd, 'pyproject.toml'), 'utf8'));
            if (parsed.project && parsed.project.name) projectName = parsed.project.name;
            else if (parsed.tool && parsed.tool.poetry && parsed.tool.poetry.name) projectName = parsed.tool.poetry.name;
        } catch (e) { }

        const pm = existsSync(join(cwd, 'poetry.lock')) ? 'poetry' : 'pip';
        ecosystems.push({ language: 'python', framework: null, packageManager: pm, manifest: 'pyproject.toml', lockfile: pm === 'poetry' ? 'poetry.lock' : null });
    }

    // PHP
    if (existsSync(join(cwd, 'composer.json'))) {
        try {
            const comp = JSON.parse(readFileSync(join(cwd, 'composer.json'), 'utf8'));
            if (comp.name) projectName = comp.name;
        } catch (e) { }

        let framework = null;
        if (existsSync(join(cwd, 'artisan'))) framework = 'laravel';

        ecosystems.push({ language: 'php', framework, packageManager: 'composer', manifest: 'composer.json', lockfile: 'composer.lock' });
    }

    // Rust
    if (existsSync(join(cwd, 'Cargo.toml'))) {
        try {
            const parsed = toml.parse(readFileSync(join(cwd, 'Cargo.toml'), 'utf8'));
            if (parsed.package && parsed.package.name) projectName = parsed.package.name;
        } catch (e) { }
        ecosystems.push({ language: 'rust', framework: null, packageManager: 'cargo', manifest: 'Cargo.toml', lockfile: 'Cargo.lock' });
    }

    // Go
    if (existsSync(join(cwd, 'go.mod'))) {
        try {
            const mod = readFileSync(join(cwd, 'go.mod'), 'utf8');
            const match = mod.match(/^module\s+(.+)$/m);
            if (match) projectName = match[1].trim();
        } catch (e) { }
        ecosystems.push({ language: 'go', framework: null, packageManager: 'go', manifest: 'go.mod', lockfile: 'go.sum' });
    }

    // Ruby
    if (existsSync(join(cwd, 'Gemfile'))) {
        let framework = null;
        if (checkFileContains(cwd, 'Gemfile', "'rails'")) framework = 'rails';

        ecosystems.push({ language: 'ruby', framework, packageManager: 'bundler', manifest: 'Gemfile', lockfile: 'Gemfile.lock' });
    }

    // Flutter
    if (existsSync(join(cwd, 'pubspec.yaml'))) {
        ecosystems.push({ language: 'dart', framework: 'flutter', packageManager: 'flutter', manifest: 'pubspec.yaml', lockfile: 'pubspec.lock' });
    }

    if (ecosystems.length === 0) {
        throw new Error("No supported ecosystem detected in the current directory.");
    }

    return { projectName, ecosystems };
}

function checkFileContains(cwd, file, text) {
    try {
        const content = readFileSync(join(cwd, file), 'utf8');
        return content.includes(text);
    } catch (e) {
        return false;
    }
}
