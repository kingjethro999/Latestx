/**
 * Fetch latest version from NPM registry
 */
export async function getNpmLatestVersion(packageName) {
    try {
        const res = await fetch(`https://registry.npmjs.org/${packageName}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data['dist-tags']?.latest || null;
    } catch (err) {
        return null;
    }
}
