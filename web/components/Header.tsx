import { Star } from 'lucide-react';

export default function Header() {
  const handleStarClick = async () => {
    const url = 'https://github.com/kingjethro999/Latestx';
    window.open(url, '_blank');
  };

  return (
    <header className="border-b border-secondary bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="mx-auto w-full px-4 lg:px-6 xl:max-w-7xl relative py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:text-white dark:!bg-none">
            Latestx
          </h1>
        </div>
        <button
          onClick={handleStarClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
        >
          <Star size={18} />
          Star on GitHub
        </button>
      </nav>
    </header>
  );
}
