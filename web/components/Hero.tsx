export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Universal Package Manager
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Manage all your packages across every ecosystem with a single, unified interface. 
            Say goodbye to complexity and hello to simplicity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#commands"
              className="px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
            >
              Get Started
            </a>
            <a
              href="https://github.com/kingjethro999/Latestx"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 font-medium transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl rounded-full"></div>
          <div className="relative bg-secondary/50 border border-primary/20 rounded-2xl p-8 backdrop-blur-sm">
            <code className="text-sm sm:text-base text-accent">
              npm install latestx -g
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
