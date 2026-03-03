/**
 * Fetch latest version from Packagist (PHP)
 */
export async function getPackagistLatestVersion(packageName) {
    try {
        // Packagist expects vendor/package format (e.g. "laravel/framework")
        const res = await fetch(`https://packagist.org/packages/${packageName}.json`);
        if (!res.ok) return null;
        const data = await res.json();
        const pkg = data.package;
        if (!pkg || !pkg.versions) return null;
        // Find the latest stable (non-dev) version
        const versions = Object.keys(pkg.versions).filter(v => !v.includes('dev'));
        if (versions.length === 0) return null;
        return versions[0].replace(/^v/, '');
    } catch (err) {
        return null;
    }
}
