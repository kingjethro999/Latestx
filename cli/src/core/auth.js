import { homedir } from 'os';
import { join } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'crypto';

const CONFIG_DIR = join(homedir(), '.latestx');
const CONFIG_FILE = join(CONFIG_DIR, 'auth.json');

// A deterministic key based on machine context to encrypt local files
// Not bank-grade, but prevents plain-text exposure on disk.
function getMachineKey() {
    const machineId = process.platform + process.arch + (process.env.USER || process.env.USERNAME || 'latestx');
    // Hash to 32 bytes for aes-256-cbc
    return createHash('sha256').update(machineId).digest();
}

function getDefaultApiKey() {
    const encStr = "4ab99c94513978be857db72789e042e2:2ec67c3944835ca6179590c4c63f71797577433581028394955c3c01cc9dc676e183adedce9ddbaf0ff0da5ee0757274";
    const [ivHex, dataHex] = encStr.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const key = createHash('sha256').update('latestx-global-secret').digest();
    const decipher = createDecipheriv('aes-256-cbc', key, iv);

    let decrypted = decipher.update(dataHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

export function saveApiKey(apiKey) {
    if (!existsSync(CONFIG_DIR)) {
        mkdirSync(CONFIG_DIR, { recursive: true });
    }

    const iv = randomBytes(16);
    const key = getMachineKey();
    const cipher = createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(apiKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const payload = {
        iv: iv.toString('hex'),
        data: encrypted
    };

    writeFileSync(CONFIG_FILE, JSON.stringify(payload));
}

export function loadApiKey() {
    if (existsSync(CONFIG_FILE)) {
        try {
            const payload = JSON.parse(readFileSync(CONFIG_FILE, 'utf8'));
            const iv = Buffer.from(payload.iv, 'hex');
            const key = getMachineKey();
            const decipher = createDecipheriv('aes-256-cbc', key, iv);

            let decrypted = decipher.update(payload.data, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            return decrypted;
        } catch (error) {
            // Fallback outside the try-catch if parsing fails
        }
    }

    return getDefaultApiKey();
}
