/**
 * Fetch latest version from pub.dev (Dart/Flutter)
 */
export async function getPubDevLatestVersion(packageName) {
    try {
        const res = await fetch(`https://pub.dev/api/packages/${packageName}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.latest?.version || null;
    } catch (err) {
        return null;
    }
}
