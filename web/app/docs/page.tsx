'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Copy, Check, ArrowLeft } from 'lucide-react';

function CodeBlock({ children }: { children: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(children.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-lg bg-[#0e0e14] border border-white/[0.06] overflow-hidden my-4">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
            >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-400" />}
            </button>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed">{children.trim()}</pre>
        </div>
    );
}

const navItems = [
    { id: 'installation', label: 'Installation' },
    { id: 'init', label: 'latestx init' },
    { id: 'install', label: 'latestx install' },
    { id: 'check', label: 'latestx check' },
    { id: 'update', label: 'latestx update' },
    { id: 'uninstall', label: 'latestx uninstall' },
    { id: 'ai', label: 'latestx ai' },
    { id: 'doctor', label: 'latestx doctor' },
    { id: 'outdated', label: 'latestx outdated' },
    { id: 'clean', label: 'latestx clean' },
    { id: 'config', label: 'latestx config' },
    { id: 'log', label: 'latestx log' },
    { id: 'list', label: 'latestx list' },
    { id: 'upgrade', label: 'latestx upgrade' },
    { id: 'ecosystems', label: 'Ecosystems' },
    { id: 'configuration', label: 'Configuration' },
];

export default function DocsPage() {
    const [active, setActive] = useState('installation');

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Top bar */}
            <div className="border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={16} />
                        <span className="text-sm">Back</span>
                    </Link>
                    <div className="h-4 w-px bg-white/10" />
                    <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Latestx Docs
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex gap-8">
                {/* Sidebar */}
                <aside className="hidden lg:block w-56 flex-shrink-0">
                    <nav className="sticky top-20 space-y-0.5 max-h-[calc(100vh-6rem)] overflow-y-auto">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={() => setActive(item.id)}
                                className={`block px-3 py-1.5 text-sm rounded-md transition-colors font-mono ${active === item.id
                                    ? 'text-primary bg-primary/10 border-l-2 border-primary'
                                    : 'text-gray-500 hover:text-gray-300 border-l-2 border-transparent'
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 min-w-0 max-w-3xl space-y-12">
                    {/* Intro */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
                        <p className="text-gray-400 leading-relaxed">
                            <code className="text-accent">latestx</code> is a universal dependency intelligence and upgrade CLI that works
                            across ecosystems, languages, and frameworks. It detects your project&apos;s language and package manager,
                            analyzes dependencies, evaluates upgrade paths, and safely updates packages with a strong emphasis on
                            compatibility and developer control.
                        </p>
                    </div>

                    {/* Installation */}
                    <section id="installation">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> Installation
                        </h3>
                        <p className="text-gray-400 mb-3">Make sure you have Node.js installed, then install globally:</p>
                        <CodeBlock>npm install -g latestx</CodeBlock>
                        <p className="text-gray-500 text-sm">Or use <code className="text-accent">pnpm add -g latestx</code> / <code className="text-accent">bun add -g latestx</code></p>
                    </section>

                    {/* Commands */}
                    <section id="init">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx init
                        </h3>
                        <p className="text-gray-400 mb-3">
                            Scans your workspace to detect the primary language and package manager. Creates a <code className="text-accent">latestx.yaml</code> config file.
                            <br /><span className="text-sm text-gray-500 italic">*Note: Most commands now auto-initialize this file if it&apos;s missing.*</span>
                        </p>
                        <CodeBlock>latestx init</CodeBlock>
                    </section>

                    <section id="install">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx install
                        </h3>
                        <p className="text-gray-400 mb-3">
                            Fetches the latest version of a package from its registry and installs it using your native package manager.
                            Use the <code className="text-accent">-c</code> or <code className="text-accent">--compatible</code> flag to let the AI analyze your project&apos;s current dependencies and install the safest compatible version.
                        </p>
                        <CodeBlock>latestx install next -c</CodeBlock>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-md">-c, --compatible</span>
                        </div>
                    </section>

                    <section id="check">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx check
                        </h3>
                        <p className="text-gray-400 mb-3">
                            Checks dependencies against remote registries and displays an interactive, color-coded selection UI.
                            Use <code className="text-accent">-n</code> or <code className="text-accent">--non-interactive</code> for CI output.
                        </p>
                        <CodeBlock>latestx check</CodeBlock>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-md">-c, --compatibility</span>
                            <span className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-md">-n, --non-interactive</span>
                        </div>
                    </section>

                    <section id="update">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx update
                        </h3>
                        <p className="text-gray-400 mb-3">
                            Updates dependencies to their latest safe versions. Add <code className="text-accent">-c</code> or <code className="text-accent">--compatibility</code> to
                            run the AI Compatibility Engine before updating.
                        </p>
                        <CodeBlock>latestx update -c</CodeBlock>
                    </section>

                    <section id="uninstall">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx uninstall
                        </h3>
                        <p className="text-gray-400 mb-3">
                            Removes a package using your project&apos;s native package manager.
                        </p>
                        <CodeBlock>latestx uninstall lodash</CodeBlock>
                    </section>

                    <section id="ai">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx ai
                        </h3>
                        <p className="text-gray-400 mb-3">
                            Latestx ships with a built-in AI key. Use <code className="text-accent">-a</code> or <code className="text-accent">--auth</code> to set your own Gemini API key.
                        </p>
                        <CodeBlock>latestx ai -a</CodeBlock>
                    </section>

                    <section id="doctor">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx doctor
                        </h3>
                        <p className="text-gray-400 mb-3">
                            Validates your environment: checks <code className="text-accent">latestx.yaml</code>, package manager availability, registry connectivity, and AI key status.
                        </p>
                        <CodeBlock>latestx doctor</CodeBlock>
                    </section>

                    <section id="outdated">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx outdated
                        </h3>
                        <p className="text-gray-400 mb-3">
                            Non-interactive report of outdated dependencies. Supports JSON and Markdown output for CI/CD pipelines.
                        </p>
                        <CodeBlock>latestx outdated -f json</CodeBlock>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-md">-f, --format json</span>
                            <span className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-md">-f, --format markdown</span>
                        </div>
                    </section>

                    <section id="clean">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx clean
                        </h3>
                        <p className="text-gray-400 mb-3">Clean the package manager cache.</p>
                        <CodeBlock>latestx clean</CodeBlock>
                    </section>

                    <section id="config">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx config
                        </h3>
                        <p className="text-gray-400 mb-3">Manage your <code className="text-accent">latestx.yaml</code> configuration.</p>
                        <CodeBlock>{`latestx config list          # Print entire config
latestx config get <key>     # Get value (dot notation)
latestx config set <key> <v> # Set value
latestx config edit          # Interactive editor`}</CodeBlock>
                    </section>

                    <section id="log">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx log
                        </h3>
                        <p className="text-gray-400 mb-3">View execution logs.</p>
                        <CodeBlock>latestx log -l 50</CodeBlock>
                    </section>

                    <section id="list">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx list
                        </h3>
                        <p className="text-gray-400 mb-3">List all installed packages from your ecosystem manifest.</p>
                        <CodeBlock>latestx list</CodeBlock>
                    </section>

                    <section id="upgrade">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-primary">#</span> latestx upgrade
                        </h3>
                        <p className="text-gray-400 mb-3">Update latestx itself to the latest version.</p>
                        <CodeBlock>latestx upgrade</CodeBlock>
                    </section>

                    {/* Ecosystems table */}
                    <section id="ecosystems">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-primary">#</span> Supported Ecosystems
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border border-white/[0.06] rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-white/[0.03]">
                                        <th className="px-4 py-3 text-gray-400 font-medium">Language</th>
                                        <th className="px-4 py-3 text-gray-400 font-medium">Package Managers</th>
                                        <th className="px-4 py-3 text-gray-400 font-medium">Manifest</th>
                                        <th className="px-4 py-3 text-gray-400 font-medium">Registry</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.04]">
                                    {[
                                        ['JavaScript', 'npm, yarn, pnpm, bun', 'package.json', 'npmjs.com'],
                                        ['Python', 'pip, poetry', 'requirements.txt, pyproject.toml', 'PyPI'],
                                        ['Rust', 'cargo', 'Cargo.toml', 'crates.io'],
                                        ['PHP', 'composer', 'composer.json', 'Packagist'],
                                        ['Go', 'go', 'go.mod', 'proxy.golang.org'],
                                        ['Ruby', 'bundler', 'Gemfile', 'RubyGems'],
                                        ['Flutter', 'flutter', 'pubspec.yaml', 'pub.dev'],
                                    ].map(([lang, managers, manifest, registry]) => (
                                        <tr key={lang} className="hover:bg-white/[0.02]">
                                            <td className="px-4 py-3 font-medium text-white">{lang}</td>
                                            <td className="px-4 py-3 text-gray-400 font-mono text-xs">{managers}</td>
                                            <td className="px-4 py-3 text-accent font-mono text-xs">{manifest}</td>
                                            <td className="px-4 py-3 text-gray-400">{registry}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Configuration */}
                    <section id="configuration">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-primary">#</span> Configuration
                        </h3>
                        <p className="text-gray-400 mb-3">After <code className="text-accent">latestx init</code>, a config file is generated:</p>
                        <CodeBlock>{`version: 1
project:
  name: your-project-name
  detected_at: 2026-02-27T12:00:00.000Z
environment:
  primary_language: javascript
  primary_framework: nextjs
  manifest_path: package.json
preferences:
  allow_major_updates: false
  interactive_default: true
  enable_ai_compatibility: true`}</CodeBlock>
                        <p className="text-gray-500 text-sm">Commit this file to standardize update rules across your team.</p>
                    </section>

                    {/* Footer */}
                    <div className="pt-8 border-t border-white/[0.06] text-center text-gray-500 text-sm">
                        <p>MIT License · Built by King Jethro</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
