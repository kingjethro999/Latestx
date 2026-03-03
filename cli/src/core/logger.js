import { appendFileSync } from 'fs';
import { join } from 'path';

export function log(message, type = 'INFO') {
    const logFilePath = join(process.cwd(), 'latestx.log');
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${type}] ${message}\n`;

    try {
        appendFileSync(logFilePath, logEntry);
    } catch (error) {
        // Silently fail if we can't write to the log file
    }
}
