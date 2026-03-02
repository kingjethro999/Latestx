export function formatJsonOutput(config, updates) {
    return JSON.stringify({
        metadata: config.project,
        environment: config.environment,
        updates: updates.map(u => ({
            name: u.name,
            current: u.current,
            latest: u.latest,
            riskLevel: u.delta
        }))
    }, null, 2);
}
