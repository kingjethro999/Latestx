'use client';

import { useState, useEffect, useRef } from 'react';

interface TermLine {
    text: string;
    color?: string;
    delay?: number; // ms pause after this line
    typed?: boolean; // if true, typewriter effect
}

const demoScript: TermLine[] = [
    { text: '$ latestx init', color: '#3b82f6', typed: true },
    { text: '', delay: 400 },
    { text: '🚀 Welcome to latestx!', color: '#06b6d4' },
    { text: '✔ Analysis complete', color: '#22c55e', delay: 600 },
    { text: '' },
    { text: 'Detected Ecosystems:', color: '#ffffff' },
    { text: '  - javascript (nextjs) via pnpm', color: '#a78bfa' },
    { text: '  - python via pip', color: '#a78bfa', delay: 300 },
    { text: '' },
    { text: '✔ Created latestx.yaml successfully.', color: '#22c55e', delay: 800 },
    { text: '' },
    { text: '$ latestx check', color: '#3b82f6', typed: true },
    { text: '', delay: 500 },
    { text: '🔍 Checking updates for my-project', color: '#06b6d4', delay: 400 },
    { text: '' },
    { text: 'Found 4 available updates:', color: '#ffffff', delay: 200 },
    { text: '' },
    { text: '  next                 14.2.3  →  15.1.0    [major]', color: '#ef4444' },
    { text: '  react                18.2.0  →  19.2.3    [major]', color: '#ef4444' },
    { text: '  typescript           5.3.3   →  5.7.2     [minor]', color: '#eab308' },
    { text: '  eslint               8.56.0  →  8.57.1    [patch]', color: '#22c55e', delay: 600 },
    { text: '' },
    { text: '$ latestx update --compatibility', color: '#3b82f6', typed: true },
    { text: '', delay: 500 },
    { text: '🧠 AI Compatibility Report:', color: '#06b6d4', delay: 400 },
    { text: '  ✔ typescript safe to update', color: '#22c55e' },
    { text: '  ✔ eslint safe to update', color: '#22c55e' },
    { text: '  ✖ next: peer dependency conflict with react 18', color: '#ef4444' },
    { text: '  ✖ react: blocked by next 14 compatibility', color: '#ef4444', delay: 400 },
    { text: '' },
    { text: '✔ Successfully updated 2 packages.', color: '#22c55e', delay: 1500 },
];

export default function TerminalDemo() {
    const [lines, setLines] = useState<{ text: string; color?: string }[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentLine >= demoScript.length) {
            // Reset after a pause
            const timer = setTimeout(() => {
                setLines([]);
                setCurrentLine(0);
                setCurrentChar(0);
                setIsTyping(false);
            }, 4000);
            return () => clearTimeout(timer);
        }

        const line = demoScript[currentLine];

        if (line.typed) {
            // Typewriter effect
            setIsTyping(true);
            if (currentChar === 0) {
                setLines((prev) => [...prev, { text: '', color: line.color }]);
            }

            if (currentChar < line.text.length) {
                const timer = setTimeout(() => {
                    setLines((prev) => {
                        const updated = [...prev];
                        updated[updated.length - 1] = {
                            text: line.text.substring(0, currentChar + 1),
                            color: line.color,
                        };
                        return updated;
                    });
                    setCurrentChar((c) => c + 1);
                }, 40 + Math.random() * 30);
                return () => clearTimeout(timer);
            } else {
                // Done typing this line
                setIsTyping(false);
                const timer = setTimeout(() => {
                    setCurrentLine((l) => l + 1);
                    setCurrentChar(0);
                }, line.delay || 200);
                return () => clearTimeout(timer);
            }
        } else {
            // Instant line
            setLines((prev) => [...prev, { text: line.text, color: line.color }]);
            const timer = setTimeout(() => {
                setCurrentLine((l) => l + 1);
            }, line.delay || 80);
            return () => clearTimeout(timer);
        }
    }, [currentLine, currentChar]);

    // Auto-scroll
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <section id="terminal-demo" className="py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 lg:px-6 space-y-8">
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase text-[#646464]">
                        [<span>Live Demo</span>]
                    </div>
                    <h2 className="text-3xl md:text-4xl tracking-tight text-white">
                        See It In Action
                    </h2>
                    <p className="max-w-md mx-auto text-gray-400">
                        Watch latestx intelligently detect, analyze, and safely update your dependencies.
                    </p>
                </div>

                {/* Terminal window */}
                <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-primary/5">
                    {/* Title bar */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-[#1c1c24] border-b border-white/[0.06]">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                        </div>
                        <span className="text-xs text-gray-500 font-mono ml-2">~/my-project — latestx</span>
                    </div>

                    {/* Terminal body */}
                    <div
                        ref={containerRef}
                        className="bg-[#0e0e14] p-4 sm:p-6 font-mono text-sm leading-6 h-[420px] overflow-y-auto"
                    >
                        {lines.map((line, idx) => (
                            <div key={idx} style={{ color: line.color || '#9ca3af' }} className="whitespace-pre">
                                {line.text || '\u00A0'}
                            </div>
                        ))}
                        {/* Blinking cursor */}
                        {currentLine < demoScript.length && (
                            <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5 align-middle"></span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
