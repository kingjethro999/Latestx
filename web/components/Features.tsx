import { Package, Zap, Users, Shield } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Universal Support',
    description: 'Works with npm, yarn, pnpm, bun, and more package managers seamlessly.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance for quick installations and updates across all ecosystems.',
  },
  {
    icon: Users,
    title: 'Simple Interface',
    description: 'Intuitive commands that work the same way regardless of your package manager.',
  },
  {
    icon: Shield,
    title: 'Secure',
    description: 'Built with security best practices to keep your dependencies safe and verified.',
  },
];

export default function Features() {
  return (
    <section className="py-20 sm:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Features</h2>
          <p className="text-foreground/60 text-lg">Everything you need in a package manager</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-primary/20 bg-background/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-background" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
