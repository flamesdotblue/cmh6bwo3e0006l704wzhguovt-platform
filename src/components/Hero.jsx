import React from 'react';
import Spline from '@splinetool/react-spline';
import { Play, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/YMbQm4jphL7pTceL/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Build AI Agent Workflows like n8n
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/80">
              Visually orchestrate triggers, tools, and models. Automate tasks, connect APIs, and ship AI-powered flows in minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#builder" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-medium">
                <Play className="w-5 h-5" />
                Try the Builder
              </a>
              <a href="#features" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-white/15 hover:border-white/30">
                <Zap className="w-5 h-5 text-yellow-300" />
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
