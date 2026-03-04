'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const commands = [
  {
    category: 'Installation',
    items: [
      { cmd: 'npm install latestx -g', desc: 'Install Latestx globally', tags: [] },
      { cmd: 'latestx init', desc: 'Initialize Latestx in your project', tags: [] },
    ],
  },
  {
    category: 'Package Management',
    items: [
      { cmd: 'latestx install <package>', desc: 'Install a new package to your project', tags: ['-c, --compatible'] },
      { cmd: 'latestx uninstall <package>', desc: 'Remove a package via native package manager', tags: [] },
      { cmd: 'latestx check', desc: 'Check for outdated dependencies', tags: ['-c, --compatibility', '-n, --non-interactive'] },
      { cmd: 'latestx update', desc: 'Update packages safely using intelligence', tags: ['-c, --compatibility'] },
      { cmd: 'latestx list', desc: 'List all installed packages natively', tags: [] },
    ],
  },
  {
    category: 'Analysis & Reports',
    items: [
      { cmd: 'latestx outdated', desc: 'Generate a dependency report for CI/CD', tags: ['-f, --format json', '-f, --format markdown'] },
      { cmd: 'latestx doctor', desc: 'Diagnose your latestx setup and environment', tags: [] },
      { cmd: 'latestx ai', desc: 'AI-assisted dependency analysis', tags: ['-a, --auth'] },
    ],
  },
  {
    category: 'Config & Maintenance',
    items: [
      { cmd: 'latestx config edit', desc: 'Interactively edit configuration', tags: [] },
      { cmd: 'latestx clean', desc: 'Clean the package manager cache', tags: [] },
      { cmd: 'latestx log', desc: 'View Latestx execution logs', tags: ['-l, --lines <number>'] },
      { cmd: 'latestx upgrade', desc: 'Update latestx itself to the latest version', tags: [] },
    ],
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 hover:bg-primary/20 rounded transition-colors"
      title="Copy command"
    >
      {copied ? (
        <Check size={18} className="text-accent" />
      ) : (
        <Copy size={18} className="text-foreground/60 hover:text-primary" />
      )}
    </button>
  );
}

export default function Commands() {
  return (
    <section id="commands" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Commands</h2>
          <p className="text-foreground/60 text-lg">Simple, intuitive commands for common tasks</p>
        </div>

        <div className="space-y-12">
          {commands.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-bold text-primary mb-4">{section.category}</h3>
              <div className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between gap-4 p-4 rounded-lg border border-primary/20 bg-secondary/30 hover:border-primary/50 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <code className="text-accent font-mono text-sm block truncate">
                        {item.cmd}
                      </code>
                      <p className="text-foreground/60 text-sm mt-1 mb-2">{item.desc}</p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <CopyButton text={item.cmd} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
