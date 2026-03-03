function JsIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
            <rect width="32" height="32" rx="4" fill="#F7DF1E" />
            <path d="M21.6 22.5c.6 1 1.4 1.7 2.8 1.7 1.2 0 1.9-.6 1.9-1.4 0-1-.8-1.3-2-1.9l-.7-.3c-2-.8-3.3-1.9-3.3-4.1 0-2 1.6-3.6 4-3.6 1.7 0 3 .6 3.8 2.2l-2.1 1.3c-.5-.8-.9-1.2-1.8-1.2-.8 0-1.3.5-1.3 1.2 0 .8.5 1.1 1.7 1.6l.7.3c2.4 1 3.7 2 3.7 4.3 0 2.5-1.9 3.8-4.5 3.8-2.5 0-4.1-1.2-4.9-2.8l2-1.1zM9.1 22.7c.4.8.8 1.4 1.7 1.4.9 0 1.5-.3 1.5-1.7v-9h2.5v9.1c0 2.8-1.6 4-4 4-2.1 0-3.4-1.1-4-2.4l2.3-1.4z" fill="#1a1a1a" />
        </svg>
    );
}

function PythonIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
            <defs>
                <linearGradient id="py1" x1="12.96" y1="1" x2="20" y2="14.65">
                    <stop offset="0" stopColor="#387EB8" />
                    <stop offset="1" stopColor="#366994" />
                </linearGradient>
                <linearGradient id="py2" x1="12" y1="17.35" x2="19.04" y2="31">
                    <stop offset="0" stopColor="#FFE052" />
                    <stop offset="1" stopColor="#FFC331" />
                </linearGradient>
            </defs>
            <path d="M15.9 2C10.3 2 10.8 4.5 10.8 4.5v2.7h5.3v.8H8.3S4 7.4 4 13.2s3.8 5.5 3.8 5.5h2.2v-2.7s-.1-3.8 3.7-3.8h5.2s3.6.1 3.6-3.5V4.9S23.2 2 15.9 2zm-2.9 1.7a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z" fill="url(#py1)" />
            <path d="M16.1 30c5.6 0 5.1-2.5 5.1-2.5v-2.7h-5.3v-.8h7.8S28 24.6 28 18.8s-3.8-5.5-3.8-5.5h-2.2v2.7s.1 3.8-3.7 3.8h-5.2S9.5 19.7 9.5 23.3v3.8S8.8 30 16.1 30zm2.9-1.7a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2z" fill="url(#py2)" />
        </svg>
    );
}

function RustIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
            <circle cx="16" cy="16" r="14" fill="#000" />
            <text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="serif">R</text>
        </svg>
    );
}

function PhpIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
            <ellipse cx="16" cy="16" rx="14" ry="10" fill="#777BB3" />
            <text x="16" y="20" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">PHP</text>
        </svg>
    );
}

function GoIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
            <rect width="32" height="32" rx="4" fill="#00ADD8" />
            <text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Go</text>
        </svg>
    );
}

function RubyIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
            <polygon points="16,2 28,10 24,28 8,28 4,10" fill="#CC342D" />
            <polygon points="16,6 24,11 21,24 11,24 8,11" fill="#E6625E" opacity="0.5" />
        </svg>
    );
}

function FlutterIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
            <path d="M18.4 2L4 16l4.4 4.5L26.8 2h-8.4zm0 14.2L10.8 24l7.6 7.6h8.4l-7.6-7.6 7.6-7.6h-8.4z" fill="#027DFD" />
            <path d="M10.8 24l3.6-3.8 4 4L14.8 28z" fill="#0553B1" />
        </svg>
    );
}

const ecosystems = [
    {
        language: 'JavaScript',
        Icon: JsIcon,
        managers: ['npm', 'yarn', 'pnpm', 'bun'],
        manifests: ['package.json'],
        registry: 'npmjs.com',
    },
    {
        language: 'Python',
        Icon: PythonIcon,
        managers: ['pip', 'poetry'],
        manifests: ['requirements.txt', 'pyproject.toml'],
        registry: 'PyPI',
    },
    {
        language: 'Rust',
        Icon: RustIcon,
        managers: ['cargo'],
        manifests: ['Cargo.toml'],
        registry: 'crates.io',
    },
    {
        language: 'PHP',
        Icon: PhpIcon,
        managers: ['composer'],
        manifests: ['composer.json'],
        registry: 'Packagist',
    },
    {
        language: 'Go',
        Icon: GoIcon,
        managers: ['go'],
        manifests: ['go.mod'],
        registry: 'proxy.golang.org',
    },
    {
        language: 'Ruby',
        Icon: RubyIcon,
        managers: ['bundler'],
        manifests: ['Gemfile'],
        registry: 'RubyGems',
    },
    {
        language: 'Flutter',
        Icon: FlutterIcon,
        managers: ['flutter'],
        manifests: ['pubspec.yaml'],
        registry: 'pub.dev',
    },
];

export default function Ecosystems() {
    return (
        <section id="ecosystems" className="relative py-16 sm:py-24">
            <div className="absolute inset-0 bg-[#0d0d10]"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-6 space-y-12">
                <div className="space-y-8">
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono tracking-widest uppercase text-[#646464]">
                        [<span>Ecosystems</span>]
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <h2 className="max-w-xl text-3xl md:text-4xl lg:text-5xl tracking-tight text-center lg:text-left text-white">
                            Universal Language Support
                        </h2>
                        <p className="max-w-md text-gray-400 text-center lg:text-left">
                            One CLI to rule them all. Latestx detects your stack and works seamlessly with every major ecosystem.
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {ecosystems.map((eco) => {
                        const Icon = eco.Icon;
                        return (
                            <div
                                key={eco.language}
                                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300"
                            >
                                <div className="flex flex-col gap-3 mb-4">
                                    <Icon />
                                    <h3 className="text-lg font-semibold text-white">{eco.language}</h3>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase tracking-wider">Package Managers</span>
                                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                                            {eco.managers.map((m) => (
                                                <span
                                                    key={m}
                                                    className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-mono text-xs"
                                                >
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-gray-500 text-xs uppercase tracking-wider">Manifest</span>
                                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                                            {eco.manifests.map((f) => (
                                                <code key={f} className="text-xs text-accent font-mono">{f}</code>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-gray-500 text-xs uppercase tracking-wider">Registry</span>
                                        <p className="text-gray-300 text-xs mt-1 font-mono">{eco.registry}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Coming soon card */}
                    <div className="group rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                        <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-3">
                            <span className="text-lg text-gray-500">+</span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">More support</p>
                        <p className="text-gray-600 text-xs mt-1">coming soon</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
