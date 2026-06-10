import { motion } from "motion/react";
import { 
  Globe, 
  Leaf, 
  Users, 
  Flame, 
  Zap, 
  ArrowRight, 
  Compass, 
  Heart, 
  Sparkles, 
  Footprints,
  ShieldAlert,
  Coins
} from "lucide-react";
import Footer from "./Footer";

interface LandingPageProps {
  onEnter: () => void;
  savedUsername?: string;
  savedLevel?: number;
  footerText?: string;
  appName?: string;
}

export default function LandingPage({ onEnter, savedUsername, savedLevel, footerText, appName = "Carbon Clash" }: LandingPageProps) {
  const initials = appName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#050A08] text-zinc-100 flex flex-col justify-between p-6 overflow-hidden relative selection:bg-emerald-400 selection:text-black">
      {/* Immersive background glow elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-lime-500/5 blur-[120px] pointer-events-none" />

      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-450/20 to-transparent" />

      {/* Header */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between z-10 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-lime-500 flex items-center justify-center font-black text-slate-950 tracking-widest text-sm shadow-glow border border-white/10">
            {initials || "CC"}
          </div>
          <div>
            <h1 className="text-sm font-black tracking-widest uppercase text-emerald-400">{appName}</h1>
            <span className="text-[9px] font-mono text-zinc-500 tracking-wider">SUSTAINABILITY ACTION PORTAL</span>
          </div>
        </div>
        {savedUsername ? (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-450">WELCOME BACK,</span>
            <span className="text-xs font-bold text-white border-b border-emerald-400/30 pb-0.5">{savedUsername} (Lvl {savedLevel})</span>
          </div>
        ) : (
          <div className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/20 px-2.5 py-1 rounded border border-emerald-500/20 shadow-glow">
            ACTIVE RAID ENTIRELY RUNNING
          </div>
        )}
      </header>

      {/* Hero Body */}
      <main className="max-w-5xl w-full mx-auto flex-1 flex flex-col justify-center my-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Segment */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full text-[10px] font-bold font-mono text-emerald-400 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-lime-400 animate-spin-slow" />
                Empowering the Green Generation
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white font-display leading-[1.1] tracking-tight">
                The Battle For the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-500">Planet's Tomorrow</span> is Ours.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                Every second, humanity releases thousands of metric tons of greenhouse gases. Knowing and actively slashing your carbon footprint is no longer optional—it is the prerequisite for planetary survival. 
              </p>
            </motion.div>

            {/* Informational Cards on Footprint & Youth Role */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Card 1: Footprints Importance */}
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/50 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Footprints className="w-5 h-5 text-emerald-400 shadow-glow" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-white">Why Footprints Matter</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed mt-2">
                  Our daily choices—from morning commutes to food selection—drive global temperatures upward. Calculating and logging small cumulative daily action offsets stabilizes carbon concentration levels, preventing ecosystem tipping points.
                </p>
              </div>

              {/* Card 2: Youth Agency */}
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-lime-950/50 border border-lime-500/20 flex items-center justify-center text-lime-400 mb-4">
                  <Users className="w-5 h-5 text-lime-400" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-white">The Power of Youth</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed mt-2">
                  Youth represent 1.8 billion climate stakeholders. With unmatched digital influence, shared networks, and standard consumption trends, small habit modifications across high-density communities trigger astronomical carbon-neutral waves of transformation.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Immersive Interactive Stat Box */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-3xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/40 border border-white/10 relative shadow-2xl relative overflow-hidden flex flex-col justify-between h-[380px]"
            >
              {/* Design Details */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40 uppercase">LIVE TRACKER DEPLOYED</span>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white">Carbon Compact Index</h3>
                  <p className="text-[10px] text-zinc-500 font-mono">CLIMATE STAKEHOLDER ENGAGEMENT MODEL</p>
                </div>

                {/* Simulated Eco metrics */}
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">Youth Active Contributors</span>
                    <span className="text-xs font-mono font-black text-emerald-300">4,892,105</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">Total Net Carbon Mitigated</span>
                    <span className="text-xs font-mono font-black text-lime-400">-42,830.4 t</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">Equipped Renewable Modules</span>
                    <span className="text-xs font-mono font-black text-white">345,910 Units</span>
                  </div>
                </div>
              </div>

              {/* Big Enter Button CTA */}
              <button
                id="enter-app-button"
                onClick={onEnter}
                className="w-full bg-gradient-to-r from-emerald-400 to-lime-500 hover:from-emerald-300 hover:to-lime-400 text-slate-950 font-black tracking-wider uppercase py-4 rounded-2xl flex items-center justify-center gap-2 group transition-all duration-300 active:scale-95 shadow-glow"
              >
                <span>Enter Action Compact</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-slate-950" />
              </button>
            </motion.div>
          </div>

        </div>
      </main>

      <Footer footerText={footerText} />
    </div>
  );
}
