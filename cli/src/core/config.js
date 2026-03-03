import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import yaml from 'yaml';
import { analyzeWorkspace } from './analyzer.js';

export async function saveConfig(cwd, analysis) {
    const configPath = join(cwd, 'latestx.yaml');

    // if config already exists, we might want to merge, but for now we overwrite/create basic
    const config = {
        version: 1,
        project: {
            name: analysis.projectName || 'unknown-project',
            detected_at: new Date().toISOString()
        },
        environment: {
            primary_language: analysis.ecosystems[0].language,
            primary_framework: analysis.ecosystems[0].framework || 'none',
            manifest_path: analysis.ecosystems[0].manifest,
        },
        preferences: {
            allow_major_updates: false,
            interactive_default: true,
            enable_ai_compatibility: true,
            auto_select_safe_updates: true
        },
        ecosystems: analysis.ecosystems
    };

    writeFileSync(configPath, yaml.stringify(config));
}

export async function loadConfig(cwd) {
    const configPath = join(cwd, 'latestx.yaml');
    if (!existsSync(configPath)) {
        // Auto-initialize if it doesn't exist
        const analysis = await analyzeWorkspace(cwd);
        await saveConfig(cwd, analysis);
    }

    const content = readFileSync(configPath, 'utf8');
    return yaml.parse(content);
}

export function writeConfig(cwd, config) {
    const configPath = join(cwd, 'latestx.yaml');
    writeFileSync(configPath, yaml.stringify(config));
}
