'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Header() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/kingjethro999/Latestx')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => { });
  }, []);

  const formatStars = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <header className="border-b border-secondary bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="mx-auto w-full px-4 lg:px-6 xl:max-w-7xl relative py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white">
              Latestx
            </h1>
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors hidden sm:inline"
          >
            Docs
          </Link>
          <Link
            href="/changelog"
            className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors hidden sm:inline"
          >
            Changelog
          </Link>
        </div>
        <a
          href="https://github.com/kingjethro999/Latestx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1a1d23] hover:bg-[#24272e] border border-white/[0.08] text-white font-medium transition-all hover:border-white/[0.15]"
        >
          <GitHubIcon size={20} />
          {stars !== null && (
            <>
              <div className="w-px h-4 bg-white/10" />
              <span className="text-sm font-semibold tabular-nums">
                {formatStars(stars)}
              </span>
            </>
          )}
        </a>
      </nav>
    </header>
  );
}
