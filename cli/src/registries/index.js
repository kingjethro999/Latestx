import { getNpmLatestVersion } from './npm.js';
import { getPyPiLatestVersion } from './pip.js';
import { getPackagistLatestVersion } from './packagist.js';
import { getPubDevLatestVersion } from './pubdev.js';
import { getCratesLatestVersion } from './crates.js';
import { getRubyGemsLatestVersion } from './rubygems.js';
import { getGoLatestVersion } from './go.js';

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
            case 'php':
                return await getPackagistLatestVersion(packageName);
            case 'dart':
                return await getPubDevLatestVersion(packageName);
            default:
                return null;
        }
    } catch (error) {
        return null;
    }
}
