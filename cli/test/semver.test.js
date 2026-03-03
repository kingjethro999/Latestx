import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateDelta } from '../src/utils/semver.js';

describe('calculateDelta', () => {
    it('should detect major updates', () => {
        assert.equal(calculateDelta('1.2.3', '2.0.0'), 'major');
        assert.equal(calculateDelta('^1.2.3', '2.0.0'), 'major');
        assert.equal(calculateDelta('~0.9.0', '1.0.0'), 'major');
    });

    it('should detect minor updates', () => {
        assert.equal(calculateDelta('1.2.3', '1.3.0'), 'minor');
        assert.equal(calculateDelta('^1.0.0', '1.5.0'), 'minor');
    });

    it('should detect patch updates', () => {
        assert.equal(calculateDelta('1.2.3', '1.2.4'), 'patch');
        assert.equal(calculateDelta('~2.0.0', '2.0.1'), 'patch');
    });

    it('should return latest when versions are same', () => {
        assert.equal(calculateDelta('1.2.3', '1.2.3'), 'latest');
    });

    it('should handle version prefixes (^, ~, >=)', () => {
        assert.equal(calculateDelta('^14.2.3', '15.1.0'), 'major');
        assert.equal(calculateDelta('~5.3.3', '5.7.2'), 'minor');
        assert.equal(calculateDelta('>=1.0.0', '1.0.1'), 'patch');
    });

    it('should return unknown for non-semver strings', () => {
        assert.equal(calculateDelta('latest', '1.0.0'), 'unknown');
        assert.equal(calculateDelta('1.0', '2.0.0'), 'unknown');
    });
});
