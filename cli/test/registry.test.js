import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getLatestVersion } from '../src/registries/index.js';

describe('Registry: npm', () => {
    it('should fetch latest version of a popular npm package', async () => {
        const version = await getLatestVersion('javascript', 'picocolors');
        assert.ok(version, 'Should return a version string');
        assert.match(version, /^\d+\.\d+\.\d+/, 'Should be a valid semver');
    });

    it('should return null for non-existent npm package', async () => {
        const version = await getLatestVersion('javascript', 'this-package-definitely-does-not-exist-xyz-999');
        assert.equal(version, null);
    });
});

describe('Registry: PyPI', () => {
    it('should fetch latest version of a popular PyPI package', async () => {
        const version = await getLatestVersion('python', 'requests');
        assert.ok(version, 'Should return a version string');
        assert.match(version, /^\d+\.\d+/, 'Should look like a version');
    });
});

describe('Registry: unsupported language', () => {
    it('should return null for unsupported language', async () => {
        const version = await getLatestVersion('cobol', 'some-package');
        assert.equal(version, null);
    });
});
