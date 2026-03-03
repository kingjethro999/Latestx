/**
 * Fetch latest version from PyPI (Python)
 */
export async function getPyPiLatestVersion(packageName) {
    try {
        const res = await fetch(`https://pypi.org/pypi/${packageName}/json`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.info?.version || null;
    } catch (err) {
        return null;
    }
}
