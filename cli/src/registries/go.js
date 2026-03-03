/**
 * Fetch latest version from Go module proxy (Go)
 */
export async function getGoLatestVersion(packageName) {
    try {
        const normalizePkg = packageName.toLowerCase();
        const res = await fetch(`https://proxy.golang.org/${normalizePkg}/@latest`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.Version ? data.Version.replace(/^v/, '') : null;
    } catch (err) {
        return null;
    }
}
