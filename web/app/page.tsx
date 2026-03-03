import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Ecosystems from '@/components/Ecosystems';
import TerminalDemo from '@/components/TerminalDemo';
import Commands from '@/components/Commands';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <Ecosystems />
      <TerminalDemo />
      <Commands />
      <Footer />
    </main>
  );
}
