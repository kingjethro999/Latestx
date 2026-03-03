export default function Footer() {
  return (
    <footer className="border-t border-secondary bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Latestx</span>
          </div>
          <p className="text-foreground/60 text-sm text-center sm:text-right">
            Universal Package Manager © 2026. All rights reserved.
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary/50 flex flex-wrap justify-center gap-6">
          <a
            href="https://github.com/kingjethro999/Latestx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/kingjethro999/Latestx/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            Issues
          </a>
          <a
            href="https://github.com/kingjethro999/Latestx/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            Discussions
          </a>
        </div>
      </div>
    </footer>
  );
}
