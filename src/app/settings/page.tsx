export default function SettingsPage() {
  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto px-8 pt-6 pb-12">
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl">
        <div>
          <h3 className="text-lg font-black text-white">Kernel Settings</h3>
          <p className="text-xs text-slate-400 mt-1">Configure RPC endpoints and security API thresholds.</p>
        </div>
        <div className="space-y-4 bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-inner">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-white">Cookie Chain RPC Endpoint</p>
              <span className="text-[11px] text-slate-400 font-mono">https://rpc.cookiescan.io</span>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-1 rounded-xl font-bold">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}