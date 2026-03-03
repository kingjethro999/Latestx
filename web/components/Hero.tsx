'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('npm');
  const [version, setVersion] = useState('1.0.0'); // Fallback

  useEffect(() => {
    fetch('/version.txt')
      .then((res) => res.text())
      .then((text) => setVersion(text.trim()))
      .catch((err) => console.error('Failed to fetch version:', err));
  }, []);

  const getCommand = () => {
    switch (activeTab) {
      case 'curl': return 'curl -fsSL https://latestx.dev/install.sh | bash';
      case 'npm': return 'npm install -g latestx';
      case 'pnpm': return 'pnpm add -g latestx';
      case 'bun': return 'bun add -g latestx';
      case 'brew': return 'brew install latestx';
      case 'paru': return 'paru -S latestx';
      default: return 'npm install -g latestx';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Explicitly restrict to launched package managers
  const tabs = ['npm', 'pnpm', 'bun'];

  return (
    <section id="hero" className="flex flex-col px-4 pt-12 pb-10 text-center md:pt-16 md:pb-12 min-h-[500px]">
      <div className="mx-auto max-w-5xl relative z-10 w-full">
        <h1 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl font-mono">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:text-white dark:!bg-none">Latestx</span>{" "}
          <span className="text-white">{version}</span>
        </h1>
        <p className="text-gray-400 mx-auto mb-12 text-xl font-semibold text-balance sm:text-2xl md:mb-14 md:text-3xl font-mono">
          The universal package manager for modern engineering.
        </p>

        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-2xl">
            <div dir="ltr" data-orientation="horizontal">
              <div
                role="tablist"
                aria-orientation="horizontal"
                className="text-gray-400 h-9 items-center justify-center rounded-lg p-1 bg-white/5 border border-primary/20 mb-6 grid w-full grid-cols-3"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab}
                    className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-sm whitespace-nowrap font-medium transition-all font-mono ${activeTab === tab
                      ? 'shadow bg-primary/20 text-primary dark:text-white border border-primary/30'
                      : 'hover:text-white'
                      }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-0 flex justify-center">
                <div className="group relative w-full max-w-fit">
                  <div className="bg-gradient-to-r from-primary/40 to-accent/40 absolute -inset-1 rounded-xl blur-lg transition-all duration-300 group-hover:blur-xl"></div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="bg-secondary dark:bg-[#1a1c23] hover:bg-secondary/90 relative inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-mono text-xs font-bold text-foreground shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] sm:gap-3 sm:rounded-xl sm:px-6 sm:py-4 sm:text-base md:gap-4 md:px-8 border border-primary/30"
                  >
                    <span className="font-bold flex-shrink-0 text-xl hidden sm:inline text-primary">{'>_'}</span>
                    <span className="truncate border-l border-foreground/10 pl-2 sm:pl-3 md:pl-4 text-accent">
                      {getCommand()}
                    </span>
                    <div className="flex flex-shrink-0 items-center gap-1 border-l border-foreground/10 pl-2 sm:gap-2 sm:pl-3 md:pl-4 hover:text-primary transition-colors">
                      {copied ? (
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" aria-hidden="true" />
                      ) : (
                        <Copy className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                      )}
                      <span className="text-sm font-bold sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center mt-12">
          <a
            className="transition-transform duration-100 active:scale-[0.98] flex cursor-pointer items-center justify-center gap-3 font-bold whitespace-nowrap outline-none hover:bg-white/5 hover:text-white bg-transparent text-gray-400 px-5 border border-white/20 min-h-12 text-sm sm:text-base rounded-md font-mono"
            href="#commands"
          >
            View Documentation
          </a>
          <a
            className="transition-transform duration-100 active:scale-[0.98] flex cursor-pointer items-center justify-center gap-3 font-bold whitespace-nowrap outline-none hover:bg-primary/90 bg-primary text-white px-5 min-h-12 text-sm sm:text-base rounded-md font-mono shadow-lg hover:shadow-primary/30"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/kingjethro999/Latestx"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
