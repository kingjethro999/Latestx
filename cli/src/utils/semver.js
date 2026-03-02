/**
 * Categorize a version update as patch, minor, or major.
 * @param {string} current e.g., ^1.2.3 or 1.2.3
 * @param {string} latest e.g., 2.0.0
 * @returns {string} "patch" | "minor" | "major" | "latest"
 */
export function calculateDelta(current, latest) {
    const cParts = cleanVersion(current).split('.');
    const lParts = cleanVersion(latest).split('.');

    // Basic check for x.y.z format
    if (cParts.length < 3 || lParts.length < 3) return 'unknown';

    const cMajor = parseInt(cParts[0], 10);
    const cMinor = parseInt(cParts[1], 10);
    const cPatch = parseInt(cParts[2].split('-')[0], 10);

    const lMajor = parseInt(lParts[0], 10);
    const lMinor = parseInt(lParts[1], 10);
    const lPatch = parseInt(lParts[2].split('-')[0], 10);

    if (lMajor > cMajor) return 'major';
    if (lMajor === cMajor && lMinor > cMinor) return 'minor';
    if (lMajor === cMajor && lMinor === cMinor && lPatch > cPatch) return 'patch';

    return 'latest';
}

/**
 * Returns color representation for the terminal
 */
export function getDeltaColor(delta, pc) {
    if (delta === 'major') return pc.red(delta);
    if (delta === 'minor') return pc.yellow(delta);
    if (delta === 'patch') return pc.green(delta);
    return pc.gray(delta);
}

function cleanVersion(version) {
    return version.replace(/^[~^>=<]+/, '').trim();
}
