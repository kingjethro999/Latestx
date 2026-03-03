import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { resolveDependencies } from '../src/core/resolver.js';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

const TEST_DIR = join(import.meta.dirname, '__fixtures__');

describe('resolveDependencies', () => {
    // Setup and teardown
    it('should resolve JavaScript dependencies from package.json', () => {
        mkdirSync(TEST_DIR, { recursive: true });

        const pkgJson = {
            name: 'test-project',
            dependencies: {
                'express': '^4.18.0',
                'lodash': '^4.17.21'
            },
            devDependencies: {
                'jest': '^29.0.0'
            }
        };

        writeFileSync(join(TEST_DIR, 'package.json'), JSON.stringify(pkgJson));

        const eco = { language: 'javascript', manifest: 'package.json' };
        const deps = resolveDependencies(TEST_DIR, eco);

        assert.equal(deps.length, 3);
        assert.ok(deps.find(d => d.name === 'express'));
        assert.ok(deps.find(d => d.name === 'lodash'));
        assert.ok(deps.find(d => d.name === 'jest'));

        // Cleanup
        rmSync(TEST_DIR, { recursive: true, force: true });
    });

    it('should resolve Python dependencies from requirements.txt', () => {
        mkdirSync(TEST_DIR, { recursive: true });

        const reqTxt = `flask==2.3.0\nrequests==2.31.0\n# comment\nnumpy==1.24.0\n`;
        writeFileSync(join(TEST_DIR, 'requirements.txt'), reqTxt);

        const eco = { language: 'python', manifest: 'requirements.txt' };
        const deps = resolveDependencies(TEST_DIR, eco);

        assert.equal(deps.length, 3);
        assert.ok(deps.find(d => d.name === 'flask' && d.current === '2.3.0'));
        assert.ok(deps.find(d => d.name === 'numpy'));

        rmSync(TEST_DIR, { recursive: true, force: true });
    });

    it('should throw on missing manifest', () => {
        assert.throws(
            () => resolveDependencies('/tmp/nonexistent-dir-xyz', { language: 'javascript', manifest: 'package.json' }),
            /not found/
        );
    });
});
