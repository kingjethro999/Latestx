/**
 * Fetch latest version from RubyGems (Ruby)
 */
export async function getRubyGemsLatestVersion(packageName) {
    try {
        const res = await fetch(`https://rubygems.org/api/v1/gems/${packageName}.json`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.version || null;
    } catch (err) {
        return null;
    }
}
