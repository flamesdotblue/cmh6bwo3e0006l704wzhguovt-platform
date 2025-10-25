import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkflowBuilder from './components/WorkflowBuilder';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <section id="builder" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WorkflowBuilder />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
