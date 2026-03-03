/**
 * Fetch latest version from crates.io (Rust)
 */
export async function getCratesLatestVersion(packageName) {
    try {
        const res = await fetch(`https://crates.io/api/v1/crates/${packageName}`, {
            headers: { 'User-Agent': 'latestx-cli/1.0.0' }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.crate?.max_version || null;
    } catch (err) {
        return null;
    }
}
