'use client';
import { useState } from 'react';
import {
  ArrowLeftIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function DocsPage() {
  const [copied, setCopied] = useState(false);

  const grantMarkdownContent = `# CookieLogix: Autonomous Intent cApp & Due Diligence Risk Engine

## 1. Executive Summary
CookieLogix is built for the Cookie Chain (SVM) ecosystem, bridging high-speed intent execution with enterprise-grade security intelligence. It protects users against modern web3 attack vectors such as drainers, malicious allowances, and compromised smart contracts.

## 2. Core Architecture & Integration
* **Intent-Driven Engine**: Translates user natural-language intent into secure SVM transactions with sub-second finality.
* **Risk Intelligence Layer**: Aggregates multi-provider threat metrics to evaluate wallet and contract safety scores in real time.
* **RPC Synchronization**: Direct communication via rpc.cookiescan.io for optimized transaction telemetry.

## 3. Startup Accelerator Grant Alignment (Webacy / DD.xyz)
* **Pre-Execution Protection**: Mitigates malicious transactions before broadcast.
* **Autonomous Security**: Fully integrated risk scanner with live alerts and telemetry metrics.
`;

  const copyMarkdown = () => {
    navigator.clipboard.writeText(grantMarkdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans relative overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950 bg-[#02050b]">
      
      {/* BACKGROUND DE IMAGEM PERSONALIZADO (cookielogix-bg.jpg) */}
      <div className="absolute inset-0 bg-[url('/cookielogix-bg.jpg')] bg-cover bg-center bg-fixed opacity-75 pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10 space-y-10">
        
        {/* Top Navigation & Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#060a14]/85 backdrop-blur-3xl border border-slate-800/80 p-6 rounded-3xl gap-4 shadow-2xl">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl"
          >
            <ArrowLeftIcon className="w-4 h-4" /> Back to CookieLogix dApp
          </a>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3.5 py-1.5 rounded-xl font-bold tracking-widest uppercase flex items-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4" /> Startup Accelerator Grant Proposal (Webacy / DD.xyz)
            </span>
            <button
              onClick={copyMarkdown}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition shadow-lg shadow-emerald-500/20"
            >
              {copied ? <ClipboardDocumentCheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
              {copied ? 'Copied Markdown' : 'Copy Grant Proposal'}
            </button>
          </div>
        </div>

        {/* Hero Section da Documentação */}
        <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/80 p-10 rounded-3xl relative overflow-hidden shadow-2xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[11px] font-bold text-emerald-400 tracking-widest uppercase relative z-10">
            <DocumentTextIcon className="w-4 h-4 text-emerald-400" /> Official Technical Documentation
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-emerald-300 tracking-tight leading-tight max-w-3xl mx-auto relative z-10">
            CookieLogix: Autonomous Intent cApp & Due Diligence Risk Engine
          </h1>
          
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed relative z-10">
            Built for the Cookie Chain (SVM) ecosystem, CookieLogix bridges high-speed intent execution with enterprise-grade security intelligence.
          </p>
        </div>

        {/* Section 2: Core Architecture */}
        <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/80 p-8 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
            <CpuChipIcon className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-wider">Core Architecture & Integration</h2>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed">
            The platform combines direct high-throughput RPC communication (<code className="text-emerald-400 font-mono bg-[#090d18] px-2 py-0.5 rounded border border-slate-800">https://rpc.cookiescan.io</code>) with multi-provider risk analysis layers. Every intent processed via the SVM terminal undergoes rigorous pre-execution scanning.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl space-y-3 shadow-inner">
              <h3 className="text-sm font-black text-emerald-400 flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4" /> 1. Intent-Driven Engine
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Translates user intent into secure SVM transactions with sub-second finality.
              </p>
            </div>

            <div className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl space-y-3 shadow-inner">
              <h3 className="text-sm font-black text-emerald-400 flex items-center gap-2">
                <CpuChipIcon className="w-4 h-4" /> 2. Risk Intelligence Layer
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aggregates multi-provider threat metrics to evaluate wallet and contract safety scores.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Grant Alignment */}
        <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/80 p-8 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
            <RocketLaunchIcon className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-wider">Startup Accelerator Grant Alignment (Webacy / DD.xyz)</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl space-y-2">
              <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wide">Pre-Execution Protection</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mitigates malicious transactions before broadcast through integrated Threat Risks and Exposure Risk APIs.
              </p>
            </div>

            <div className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl space-y-2">
              <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wide">Autonomous Security</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fully functional risk scanner with live alerts feed, telemetry metrics, and multi-layered audit dashboards.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}