import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-semibold mb-2">AgentFlow</h4>
            <p className="text-white/70">Visual automation for AI agents. Connect triggers, APIs, and models to build powerful workflows without code.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Pricing</h4>
            <ul className="space-y-1 text-white/70">
              <li>Free: 3 workflows, community support</li>
              <li>Pro: Unlimited workflows, priority support</li>
              <li>Team: SSO, audit logs, collaboration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="space-y-1 text-white/70">
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-xs text-white/50">© {new Date().getFullYear()} AgentFlow Inc.</div>
      </div>
    </footer>
  );
}
