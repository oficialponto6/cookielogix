'use client';
import Link from 'next/link';

export default function GrantDocumentation() {
  return (
    <main className="min-h-screen bg-[#090D16] text-slate-100 p-8 md:p-16 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation back */}
        <div className="flex justify-between items-center border-b border-slate-800/80 pb-6">
          <Link href="/" className="text-sm text-emerald-400 hover:underline flex items-center gap-2">
            ← Back to CookieLogix dApp
          </Link>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1 rounded-full font-semibold">
            Startup Accelerator Grant Proposal (Webacy / DD.xyz)
          </span>
        </div>

        {/* Title & Overview */}
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-white">
            CookieLogix 🍪: Autonomous Intent cApp & Due Diligence Risk Engine
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Built for the Cookie Chain (SVM) ecosystem, CookieLogix bridges high-speed intent execution with enterprise-grade security intelligence, protecting users against modern web3 vectors like drainers, malicious approvals, and compromised contracts.
          </p>
        </div>

        {/* Architecture Section */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <h2 className="text-xl font-bold text-white">⚙️ Core Architecture & Integration</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            The platform combines direct high-throughput RPC communication (`https://rpc.cookiescan.io`) with multi-provider risk analysis layers. Every intent processed via the SVM terminal undergoes rigorous pre-execution scanning.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-emerald-400">1. Intent-Driven Engine</h3>
              <p className="text-xs text-slate-400 mt-1">Translates user intent into secure SVM transactions with sub-second finality.</p>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-emerald-400">2. Risk Intelligence Layer</h3>
              <p className="text-xs text-slate-400 mt-1">Aggregates multi-provider threat metrics to evaluate wallet and contract safety scores.</p>
            </div>
          </div>
        </div>

        {/* API Integration Details */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <h2 className="text-xl font-bold text-white">👩🏻‍💻 Multi-Provider Risk APIs</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold">▪</span>
              <div>
                <strong className="text-white">Threat Risks API:</strong> Discovers historical risk profiles of EOAs, contracts, and tokens to prevent interaction with flagged or sanctioned entities.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold">▪</span>
              <div>
                <strong className="text-white">Approval Risks API:</strong> Inspects token allowances and flags dangerous infinite approvals to mitigate asset drain attacks.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold">▪</span>
              <div>
                <strong className="text-white">Transaction Intelligence:</strong> Evaluates transactional health and smart contract safety prior to wallet signature confirmation.
              </div>
            </li>
          </ul>
        </div>

        {/* Submission Details */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <span>Repository: github.com/oficialponto6/cookielogix</span>
          <Link href="https://cookielogix.vercel.app" className="text-emerald-400 hover:underline">
            Live Deployment: cookielogix.vercel.app →
          </Link>
        </div>

      </div>
    </main>
  );
}