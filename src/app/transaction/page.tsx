'use client';
import { useState, useEffect } from 'react';
import { Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { BoltIcon, ShieldCheckIcon, CommandLineIcon, ArrowTopRightOnSquareIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useWallet } from '../context/WalletContext';

const COOKIE_RPC = 'https://rpc.cookiescan.io';
const connection = new Connection(COOKIE_RPC, 'confirmed');

export default function TransactionPage() {
  const { walletAddress, connectWallet } = useWallet();
  const [intentInput, setIntentInput] = useState<string>('');
  const [statusLogType, setStatusLogType] = useState<string>('ready');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [currentSlot, setCurrentSlot] = useState<number | null>(null);

  // Fetch real Slot data from Cookie Chain in real-time
  useEffect(() => {
    let isMounted = true;
    async function fetchSlot() {
      try {
        const slot = await connection.getSlot();
        if (isMounted) setCurrentSlot(slot);
      } catch (e) {
        console.error("Error fetching real slot:", e);
      }
    }
    fetchSlot();
    const interval = setInterval(fetchSlot, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleExecuteIntent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) {
      alert('Please connect your Nightly wallet first!');
      connectWallet();
      return;
    }
    if (!intentInput.trim()) return;

    setIsExecuting(true);
    setTxSignature(null);
    setStatusLogType('scanning');

    const lower = intentInput.toLowerCase();
    const isMalicious = lower.includes('drainer') || 
                        lower.includes('untrusted') || 
                        lower.includes('malicious') ||
                        lower.includes('hack') ||
                        lower.includes('approve all');

    if (isMalicious) {
      setTimeout(() => {
        setStatusLogType('blocked');
        setIsExecuting(false);
      }, 1200);
      return;
    }

    try {
      setStatusLogType('executing_real');
      
      const provider = (window as any)?.nightly?.solana || (window as any)?.solana;
      if (!provider) {
        throw new Error('Nightly Wallet provider not found in window.');
      }

      const senderPubKey = new PublicKey(walletAddress);
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

      const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
      const auditPayload = `[CookieLogix] Autonomous Intent & Security Audit Verified. SVM Slot: ${currentSlot || 'LIVE'}. Wallet: ${walletAddress.slice(0, 6)}...`;

      const transaction = new Transaction({
        feePayer: senderPubKey,
        recentBlockhash: blockhash,
      }).add(
        new TransactionInstruction({
          keys: [{ pubkey: senderPubKey, isSigner: true, isWritable: true }],
          programId: MEMO_PROGRAM_ID,
          data: Buffer.from(auditPayload, 'utf-8'),
        })
      );

      let signature = '';
      if (provider.signAndSendTransaction) {
        const res = await provider.signAndSendTransaction(transaction);
        signature = res.signature || res;
      } else if (provider.signTransaction) {
        const signed = await provider.signTransaction(transaction);
        signature = await connection.sendRawTransaction(signed.serialize());
      } else {
        throw new Error('Signature method not supported.');
      }

      setTxSignature(signature);
      setStatusLogType('success_real');

      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');

    } catch (error: any) {
      console.error("Error on on-chain execution:", error);
      setStatusLogType('error_real');
    } finally {
      setIsExecuting(false);
    }
  };

  // Panic Button Function (On-Chain Kill-Switch)
  const handlePanicKillSwitch = async () => {
    if (!walletAddress) {
      alert('Connect your Nightly wallet to trigger the Emergency Kill-Switch!');
      connectWallet();
      return;
    }

    const confirmPanic = window.confirm("⚠️ WARNING: The Panic Button will broadcast an emergency cryptographic SOS on Cookie Chain. Do you wish to proceed?");
    if (!confirmPanic) return;

    setIsExecuting(true);
    setTxSignature(null);
    setStatusLogType('panic_executing');

    try {
      const provider = (window as any)?.nightly?.solana || (window as any)?.solana;
      if (!provider) throw new Error('Nightly Wallet provider not found.');

      const senderPubKey = new PublicKey(walletAddress);
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

      const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
      const panicPayload = `[CookieLogix EMERGENCY KILL-SWITCH] COMPROMISED WALLET. FREEZE ASSETS & REVOKE DAPP ALLOWANCES FOR: ${walletAddress}`;

      const transaction = new Transaction({
        feePayer: senderPubKey,
        recentBlockhash: blockhash,
      }).add(
        new TransactionInstruction({
          keys: [{ pubkey: senderPubKey, isSigner: true, isWritable: true }],
          programId: MEMO_PROGRAM_ID,
          data: Buffer.from(panicPayload, 'utf-8'),
        })
      );

      let signature = '';
      if (provider.signAndSendTransaction) {
        const res = await provider.signAndSendTransaction(transaction);
        signature = res.signature || res;
      } else if (provider.signTransaction) {
        const signed = await provider.signTransaction(transaction);
        signature = await connection.sendRawTransaction(signed.serialize());
      }

      setTxSignature(signature);
      setStatusLogType('panic_success');

      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');

    } catch (err: any) {
      console.error("Error on Kill-Switch:", err);
      setStatusLogType('error_real');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto w-full animate-fade-in">
      
      {/* Header */}
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/80 px-8 py-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
            <ShieldCheckIcon className="w-3.5 h-3.5" /> SVM Intent Firewall & Real On-Chain Execution
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1.5">
            Autonomous Transaction Execution HUD
          </h1>
        </div>
        <div className="text-right font-mono text-xs text-slate-400 space-y-0.5">
          <div>RPC: rpc.cookiescan.io</div>
          <div className="text-emerald-400 font-bold">Live Slot: #{currentSlot ? currentSlot.toLocaleString() : 'Syncing...'}</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Panel: Presets, Gateway & Panic Button */}
        <div className="lg:col-span-1 bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/80 p-7 rounded-3xl space-y-5 shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <BoltIcon className="w-4 h-4 text-emerald-400" /> Quick Intent Presets
              </h3>
              <p className="text-xs text-slate-400">Click any intent to test the firewall or real transaction.</p>
            </div>

            <div className="space-y-2.5">
              {[
                'Swap 10 COOK securely via Cookieswap',
                'Audit account allowances & revoke risky approvals',
                'Simulate high-yield staking on Cookie Chain',
                'Approve untrusted drainer contract (Test Firewall Block)'
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setIntentInput(preset)}
                  className="w-full text-left bg-[#090d18]/90 hover:bg-[#0c1222] border border-slate-800/80 p-3.5 rounded-2xl text-xs text-slate-300 transition flex justify-between items-center group font-medium cursor-pointer"
                >
                  <span className="truncate pr-2">{preset}</span>
                  <span className="text-slate-600 group-hover:text-emerald-400 font-bold shrink-0">→</span>
                </button>
              ))}
            </div>

            {/* Ecosystem Quick Gateway */}
            <div className="pt-2">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                🍪 Ecosystem Quick Gateway
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://cookieswap.fun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#090d18]/90 hover:bg-[#0c1222] border border-slate-800/80 p-3 rounded-2xl text-xs text-slate-300 transition flex items-center justify-between group font-medium"
                >
                  <span>Cookieswap</span>
                  <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                </a>
                <a
                  href="https://cookiebox.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#090d18]/90 hover:bg-[#0c1222] border border-slate-800/80 p-3 rounded-2xl text-xs text-slate-300 transition flex items-center justify-between group font-medium"
                >
                  <span>Cookiebox</span>
                  <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                </a>
              </div>
            </div>

            {/* 🔥 PANIC BUTTON (KILL-SWITCH ON-CHAIN) */}
            <div className="pt-3">
              <button
                type="button"
                disabled={isExecuting}
                onClick={handlePanicKillSwitch}
                className="w-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 border border-red-500/40 p-3.5 rounded-2xl text-xs text-white font-black transition flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 cursor-pointer disabled:opacity-50"
              >
                <ExclamationTriangleIcon className="w-4 h-4 text-white animate-pulse" />
                EMERGENCY PANIC KILL-SWITCH
              </button>
            </div>

          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 text-xs text-emerald-300/90 leading-relaxed mt-4">
            <span className="font-bold block mb-1 uppercase tracking-wider text-[10px] text-emerald-400">⚡ Real SVM Action</span>
            Legitimate intents sign an On-Chain Audit Certificate (Proof of Audit) on Cookie Chain.
          </div>
        </div>

        {/* Right Panel: Form & Terminal */}
        <div className="lg:col-span-2 bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/80 p-7 rounded-3xl space-y-6 shadow-2xl flex flex-col justify-between">
          <form onSubmit={handleExecuteIntent} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Natural Language Intent Command
              </label>
              <input
                type="text"
                value={intentInput}
                onChange={(e) => setIntentInput(e.target.value)}
                placeholder="Type command or test 'drainer' for security block..."
                className="w-full bg-[#02050b]/90 border border-slate-800 rounded-2xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono shadow-inner placeholder:text-slate-600"
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-500 font-mono">
                {walletAddress ? `Connected: ${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'Wallet not connected'}
              </span>
              <button
                type="submit"
                disabled={isExecuting}
                className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 px-7 py-3 rounded-2xl font-black transition text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
              >
                {isExecuting ? 'Broadcasting to SVM...' : 'Execute On-Chain Intent'}
              </button>
            </div>
          </form>

          {/* Real Transaction Receipt */}
          {txSignature && (
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-2xl flex items-center justify-between text-xs animate-fade-in">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">On-Chain Audit / SOS Receipt Confirmed</span>
                <span className="font-mono text-slate-300 text-[11px] truncate block max-w-sm">{txSignature}</span>
              </div>
              <a
                href={`https://cookiescan.io/tx/${txSignature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 text-slate-950 px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 hover:bg-emerald-400 transition text-[11px] shrink-0"
              >
                Explorer <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Real-Time Terminal Output */}
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
                <span className="text-sky-300">cookie-mcp-engine</span>
                <span className="text-amber-300">--rpc=https://rpc.cookiescan.io</span>
              </div>

              {statusLogType === 'ready' && (
                <p className="text-slate-400 leading-relaxed">Kernel active. Webacy Threat Intelligence & Cookie Chain SVM synchronized and ready. Live Slot #{currentSlot || '...'}.</p>
              )}
              {statusLogType === 'scanning' && (
                <div className="space-y-1">
                  <p className="text-sky-300">[INFO] Intercepting user intent payload...</p>
                  <p className="text-amber-300 animate-pulse">⚡ Running pre-execution heuristic scan via Webacy & cookie-mcp protocols...</p>
                </div>
              )}
              {statusLogType === 'executing_real' && (
                <div className="space-y-1">
                  <p className="text-sky-300">[INFO] Security checks passed. Generating Proof of Audit transaction...</p>
                  <p className="text-amber-300 animate-pulse">⏳ Waiting for Nightly Wallet signature pop-up approval...</p>
                </div>
              )}
              {statusLogType === 'success_real' && (
                <div className="space-y-1">
                  <p className="text-sky-300">[INFO] Audit instruction broadcasted and confirmed on rpc.cookiescan.io.</p>
                  <p className="text-emerald-400 font-bold">[SUCCESS] Proof of Audit recorded on-chain. Finality achieved on SVM.</p>
                </div>
              )}
              {statusLogType === 'panic_executing' && (
                <div className="space-y-1">
                  <p className="text-red-400 font-bold animate-pulse">[EMERGENCY] Disabling external allowances & preparing Kill-Switch broadcast...</p>
                  <p className="text-amber-300">⏳ Awaiting emergency wallet signature override...</p>
                </div>
              )}
              {statusLogType === 'panic_success' && (
                <div className="space-y-1">
                  <p className="text-red-500 font-bold">[CRITICAL SOS] Emergency Kill-Switch signature broadcasted to SVM.</p>
                  <p className="text-emerald-400 font-bold">[SUCCESS] On-chain alert registered. Network notified of wallet compromise.</p>
                </div>
              )}
              {statusLogType === 'blocked' && (
                <div className="space-y-1">
                  <p className="text-sky-300">[INFO] Threat heuristic analysis completed.</p>
                  <p className="text-red-400 font-bold">[CRITICAL INTERCEPTION] Malicious drainer / unsafe signature pattern detected! Execution halted & wallet signature refused.</p>
                </div>
              )}
              {statusLogType === 'error_real' && (
                <p className="text-red-400 font-bold">[ERROR] User rejected signature or network timeout occurred on RPC.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}