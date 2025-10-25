import React from 'react';
import { Rocket, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Rocket className="w-6 h-6 text-cyan-400" />
          <span className="font-semibold tracking-tight">AgentFlow</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#builder" className="hover:text-white transition">Builder</a>
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 hover:border-white/20 text-sm">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <a href="#builder" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-medium">
            Launch Builder
          </a>
        </div>
      </div>
    </header>
  );
}
