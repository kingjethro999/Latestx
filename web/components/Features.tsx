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
    <section id="features" className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-[#0A0A0A]"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-6 space-y-12">
        <div className="space-y-8">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono tracking-widest uppercase text-[#646464]">
            [<span>Key Features</span>]
          </div>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <h2 className="max-w-xl text-3xl md:text-4xl lg:text-5xl tracking-tight text-center lg:text-left text-white">
              Why Choose Latestx?
            </h2>
            <p className="max-w-md text-gray-400 text-center lg:text-left">
              Our universal dependency intelligence CLI offers unprecedented flexibility, speed, and safety for modern developers.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="lg:border-l border-[#151619] pt-8 text-center lg:text-left lg:p-8">
                <div className="mb-6 flex justify-center lg:justify-start">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white">{feature.title}</h3>
                <p className="mt-3 text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
