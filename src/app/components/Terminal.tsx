'use client';
import { CommandLineIcon } from '@heroicons/react/24/outline';

interface TerminalProps {
  statusLogType: string;
}

export function Terminal({ statusLogType }: TerminalProps) {
  return (
    <div className="bg-[#1e1e1e] backdrop-blur-md border border-slate-700/60 rounded-2xl p-5 font-mono text-xs shadow-2xl space-y-2 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-8 bg-[#2d2d2d] border-b border-slate-700/60 px-4 flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          <CommandLineIcon className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-slate-300">Cookie Chain SVM Kernel Terminal v1.2</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
      </div>
      
      <div className="pt-6 space-y-2">
        <div className="flex items-center gap-1 text-slate-400">
          <span className="text-emerald-400 font-bold">$</span>
          <span className="text-sky-300">intent-engine</span>
          <span className="text-amber-300">--status=ready</span>
          <span className="text-purple-400">--rpc=cookiescan.io</span>
        </div>

        {statusLogType === 'ready' && (
          <p className="text-slate-400 leading-relaxed">Kernel active. Webacy Threat Intelligence & Cookie Chain SVM synchronized.</p>
        )}
        {statusLogType === 'connecting' && (
          <div className="space-y-1">
            <p className="text-sky-300">[INFO] Establishing secure cryptographic handshake with Nightly Wallet...</p>
            <p className="text-amber-300 animate-pulse">⏳ Waiting for provider signature response...</p>
          </div>
        )}
        {statusLogType === 'success_connect' && (
          <div className="space-y-1">
            <p className="text-sky-300">[INFO] Cryptographic handshake verified successfully.</p>
            <p className="text-emerald-400 font-bold">[SUCCESS] Authenticated securely. Session token active.</p>
          </div>
        )}
        {statusLogType === 'scanning' && (
          <div className="space-y-1">
            <p className="text-sky-300">[INFO] Querying DD.xyz Threat Risks API for target hash...</p>
            <p className="text-amber-300 animate-pulse">🔍 Analyzing heuristic vectors and mempool transactions...</p>
          </div>
        )}
        {statusLogType === 'success_scan' && (
          <div className="space-y-1">
            <p className="text-sky-300">[INFO] Target hash evaluation finalized.</p>
            <p className="text-emerald-400 font-bold">[SUCCESS] Scan complete. Zero threat exposure detected.</p>
          </div>
        )}
        {statusLogType === 'executing' && (
          <div className="space-y-1">
            <p className="text-sky-300">[INFO] Initializing SVM Intent Engine pipeline...</p>
            <p className="text-amber-300 animate-pulse">⚡ Running pre-execution security scan via Webacy...</p>
          </div>
        )}
        {statusLogType === 'success_exec' && (
          <div className="space-y-1">
            <p className="text-sky-300">[INFO] Pre-execution filters passed with 100% confidence.</p>
            <p className="text-emerald-400 font-bold">[SUCCESS] Intent executed securely on Cookie Chain. Zero threats found.</p>
          </div>
        )}
        {statusLogType === 'error' && (
          <p className="text-red-400 font-bold">[ERROR] Operation failed or wallet extension missing.</p>
        )}
      </div>
    </div>
  );
}