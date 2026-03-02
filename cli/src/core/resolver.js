import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Resolves dependencies based on language and manifest
 */
export function resolveDependencies(cwd, ecosystem) {
    const { language, manifest } = ecosystem;
    const manifestPath = join(cwd, manifest);

    if (!existsSync(manifestPath)) {
        throw new Error(`Manifest ${manifest} not found.`);
    }

    const content = readFileSync(manifestPath, 'utf8');
    let dependencies = [];

    if (language === 'javascript') {
        const pkg = JSON.parse(content);
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        for (const [name, version] of Object.entries(deps)) {
            dependencies.push({ name, current: version });
        }
    }
    else if (language === 'python') {
        if (manifest === 'requirements.txt') {
            const lines = content.split('\n');
            for (const line of lines) {
                if (!line || line.startsWith('#')) continue;
                const [name, version] = line.split('==');
                if (name && version) {
                    dependencies.push({ name: name.trim(), current: version.trim() });
                }
            }
        }
        // Note: pyproject.toml would require a TOML parser
    }
    else if (language === 'php') {
        const comp = JSON.parse(content);
        const deps = { ...comp.require, ...comp['require-dev'] };
        for (const [name, version] of Object.entries(deps)) {
            if (name === 'php') continue;
            dependencies.push({ name, current: version });
        }
    }
    // Other languages would be parsed similarly here

    return dependencies;
}
