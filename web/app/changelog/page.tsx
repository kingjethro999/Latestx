import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const releases = [
    {
        version: 'v1.0.7',
        date: 'March 2026',
        title: 'Massive Ecosystem Expansion & Bug Fixes',
        description: 'A colossal improvement to the internal analyzer, natively mapping and resolving over 60+ frameworks across 7 languages, alongside a critical registry update fix.',
        changes: [
            { type: 'feature', desc: 'Added advanced detection for 40+ JavaScript logic tools—from frontend stalwarts (React, Vue, Svelte, Angular) to metaparents (Next, Nuxt, Astro) and backend APIs (Nest, Fastify, Elysia, Hono).' },
            { type: 'feature', desc: 'Vastly expanded Python diagnostics for web (Django, Flask, FastAPI) and ML environments (Streamlit, Gradio).' },
            { type: 'feature', desc: 'Added hyper-specific scanning for Ruby (Rails, Sinatra), PHP (Laravel, Symfony, WordPress), Go (Gin, Fiber, Echo), Rust (Actix, Axum, Tauri), and Dart/Flutter ecosystems.' },
            { type: 'bugfix', desc: 'Resolved a 404 registry error in `latestx upgrade` by targeting the root package endpoint and parsing `dist-tags.latest`.' }
        ]
    },
    {
        version: 'v1.0.6',
        date: 'March 2026',
        title: 'Global Short Form Commands',
        description: 'Quality of life improvements for developers with the addition of global short-form aliases to all commands.',
        changes: [
            { type: 'improvement', desc: 'Added short aliases like `-c` for `--compatibility`, `-n` for `--non-interactive`, `-f` for `--format`, and `-a` for `--auth`.' }
        ]
    },
    {
        version: 'v1.0.5',
        date: 'March 2026',
        title: 'Advanced Commands & AI Enhancements',
        description: 'A major feature update introducing new CLI commands, robust configurations, and advanced AI synchronization.',
        changes: [
            { type: 'feature', desc: 'Introduced `-c, --compatible` flag to `latestx install` and `update` for context-aware AI dependency recommendations.' },
            { type: 'feature', desc: 'Added advanced commands: `latestx init`, `check`, `outdated`, `uninstall`, `doctor`, `log`, `clean`, `config` and `upgrade`.' },
            { type: 'feature', desc: 'Smart auto-initialization of `latestx.yaml` if missing during command execution.' },
            { type: 'improvement', desc: 'Migrated all configuration loading sequences to asynchronous operations for better performance.' },
            { type: 'docs', desc: 'Massively updated documentation and CLI reporting formats.' }
        ]
    },
    {
        version: 'v1.0.1',
        date: 'Late February 2026',
        title: 'Ecosystem Expansion',
        description: 'Expanded support to cover a vast array of programming languages and package managers with proper registry endpoints.',
        changes: [
            { type: 'feature', desc: 'Added full support for JavaScript (npm, pnpm, yarn, bun) via registry.npmjs.org.' },
            { type: 'feature', desc: 'Added full support for Python (pip) via pypi.org.' },
            { type: 'feature', desc: 'Added full support for Rust (cargo) via crates.io.' },
            { type: 'feature', desc: 'Added full support for PHP (composer) via packagist.org.' },
            { type: 'feature', desc: 'Added full support for Go via proxy.golang.org.' },
            { type: 'feature', desc: 'Added full support for Ruby (bundler) via rubygems.org.' },
            { type: 'feature', desc: 'Added full support for Flutter (pub.dev) via pub.dev.' }
        ]
    },
    {
        version: 'v1.0.0',
        date: 'Early February 2026',
        title: 'Initial Release',
        description: 'The very first release of Latestx, focusing purely on testing the core architecture concept.',
        changes: [
            { type: 'feature', desc: 'Initial support exclusively for the JavaScript ecosystem.' },
            { type: 'feature', desc: 'Basic dependency resolution and upgrade paths.' }
        ]
    }
];

function Badge({ type }: { type: string }) {
    const styles: Record<string, string> = {
        feature: 'bg-green-500/10 text-green-400 border-green-500/20',
        improvement: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        bugfix: 'bg-red-500/10 text-red-400 border-red-500/20',
        docs: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    };

    return (
        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded border ${styles[type] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
            {type}
        </span>
    );
}

export default function Changelog() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Top bar */}
            <div className="border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} />
                            <span className="text-sm">Back</span>
                        </Link>
                        <div className="h-4 w-px bg-white/10" />
                        <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Changelog
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 lg:px-6 py-16">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">Release Notes</h2>
                    <p className="text-gray-400 text-lg">Track the evolution of Latestx</p>
                </div>

                <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {releases.map((release) => (
                        <div key={release.version} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                            {/* Timeline dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                                <svg className="fill-current w-4 h-4" viewBox="0 0 24 24">
                                    <path d="M12 2L15 8H21L16 12L18 18L12 15L6 18L8 12L3 8H9L12 2Z"></path>
                                </svg>
                            </div>

                            {/* Event Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-white/[0.06] bg-secondary/30 hover:bg-secondary/50 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-2xl font-bold text-accent">{release.version}</h3>
                                    </div>
                                    <time className="text-sm text-gray-500 font-mono bg-white/5 px-2 py-1 rounded-md w-fit">{release.date}</time>
                                </div>

                                <h4 className="text-lg font-semibold text-white mb-2">{release.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 block">{release.description}</p>

                                <ul className="space-y-3">
                                    {release.changes.map((change, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm text-gray-300">
                                            <div className="mt-0.5 shrink-0">
                                                <Badge type={change.type} />
                                            </div>
                                            <span className="leading-relaxed">{change.desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
