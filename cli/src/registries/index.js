import { getNpmLatestVersion } from './npm.js';

export async function getLatestVersion(language, packageName) {
    try {
        switch (language) {
            case 'javascript':
                return await getNpmLatestVersion(packageName);
            case 'python':
                return await getPyPiLatestVersion(packageName);
            case 'rust':
                return await getCratesLatestVersion(packageName);
            case 'ruby':
                return await getRubyGemsLatestVersion(packageName);
            case 'go':
                return await getGoLatestVersion(packageName);
            // PHP and Dart omitted for brevity in this initial implementation, fallback to null
            default:
                return null; // Not implemented / Fetching not supported yet
        }
    } catch (error) {
        return null;
    }
}

async function getPyPiLatestVersion(packageName) {
    const res = await fetch(`https://pypi.org/pypi/${packageName}/json`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.info?.version || null;
}

async function getCratesLatestVersion(packageName) {
    // Crates.io requires a User-Agent
    const res = await fetch(`https://crates.io/api/v1/crates/${packageName}`, {
        headers: { 'User-Agent': 'latestx-cli/1.0.0' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.crate?.max_version || null;
}

async function getRubyGemsLatestVersion(packageName) {
    const res = await fetch(`https://rubygems.org/api/v1/versions/${packageName}/latest.json`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.version || null;
}

async function getGoLatestVersion(packageName) {
    // Module path must be lowercase, and handling go proxy formats
    const normalizePkg = packageName.toLowerCase();
    const res = await fetch(`https://proxy.golang.org/${normalizePkg}/@latest`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.Version ? data.Version.replace(/^v/, '') : null;
}
