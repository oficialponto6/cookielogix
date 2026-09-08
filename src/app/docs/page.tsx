'use client';
import Link from 'next/link';

export default function GrantDocumentation() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Background Neon Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-teal-500/10 rounded-full blur-[200px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10 space-y-10">
        
        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/40 border border-slate-800/80 backdrop-blur-2xl p-5 rounded-3xl gap-4 shadow-2xl">
          <Link href="/" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-2">
            ← Back to CookieLogix dApp
          </Link>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
            Startup Accelerator Grant Proposal (Webacy / DD.xyz)
          </span>
        </div>

        {/* Title & Core Overview */}
        <div className="bg-slate-900/30 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-2xl space-y-4 shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            CookieLogix 🍪: Autonomous Intent cApp & Due Diligence Risk Engine
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium">
            Built for the Cookie Chain (SVM) ecosystem, CookieLogix bridges high-speed intent execution with enterprise-grade security intelligence, protecting users against modern web3 vectors like drainers, malicious approvals, and compromised contracts.
          </p>
        </div>

        {/* Architecture Section */}
        <div className="bg-slate-900/30 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-2xl space-y-6 shadow-2xl">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            ⚙️ Core Architecture & Integration
          </h2>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
            The platform combines direct high-throughput RPC communication (<code className="text-emerald-400 font-mono">https://rpc.cookiescan.io</code>) with multi-provider risk analysis layers. Every intent processed via the SVM terminal undergoes rigorous pre-execution scanning.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl space-y-2">
              <h3 className="text-sm font-black text-emerald-400">1. Intent-Driven Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Translates user intent into secure SVM transactions with sub-second finality.</p>
            </div>
            <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl space-y-2">
              <h3 className="text-sm font-black text-emerald-400">2. Risk Intelligence Layer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Aggregates multi-provider threat metrics to evaluate wallet and contract safety scores.</p>
            </div>
          </div>
        </div>

        {/* API Integration Details */}
        <div className="bg-slate-900/30 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-2xl space-y-6 shadow-2xl">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            👩🏻‍💻 Multi-Provider Risk APIs (Webacy / DD.xyz)
          </h2>
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-1">
              <h4 className="text-sm font-black text-emerald-400">Threat Risks API</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Discovers historical risk profiles of EOAs, contracts, and tokens to prevent interaction with flagged or sanctioned entities.
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-1">
              <h4 className="text-sm font-black text-emerald-400">Approval Risks API</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inspects token allowances and flags dangerous infinite approvals to mitigate asset drain attacks.
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-1">
              <h4 className="text-sm font-black text-emerald-400">Transaction Intelligence</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates transactional health and smart contract safety prior to wallet signature confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Submission Details */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <span className="font-mono">Repository: github.com/oficialponto6/cookielogix</span>
          <Link href="https://cookielogix.vercel.app" className="text-emerald-400 hover:underline font-bold">
            Live Deployment: cookielogix.vercel.app →
          </Link>
        </div>

      </div>
    </div>
  );
}