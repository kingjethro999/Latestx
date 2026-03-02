/**
 * Fetch latest version from NPM registry
 */
export async function getNpmLatestVersion(packageName) {
    try {
        const res = await fetch(`https://registry.npmjs.org/${packageName}/latest`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.version;
    } catch (err) {
        return null;
    }
}
