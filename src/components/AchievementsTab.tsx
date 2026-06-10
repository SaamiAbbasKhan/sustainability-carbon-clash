import { useState } from "react";
import { 
  Award, 
  Lock, 
  CheckCircle, 
  Sparkles, 
  Tv, 
  ShoppingBag, 
  Compass, 
  Zap, 
  Flame, 
  TrendingUp, 
  Activity 
} from "lucide-react";
import { Achievement } from "../types";

interface AchievementsTabProps {
  achievements: Achievement[];
}

export default function AchievementsTab({ achievements }: AchievementsTabProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "completed" | "locked">("all");

  const getTierColor = (tier: Achievement["tier"]) => {
    switch (tier) {
      case "Bronze": return "from-amber-700/20 to-amber-900/10 border-amber-800/40 text-amber-500 bg-amber-950/35";
      case "Silver": return "from-slate-400/20 to-slate-500/10 border-slate-500/35 text-slate-300 bg-slate-800/35";
      case "Gold": return "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-500 bg-yellow-950/35";
      case "Platinum": return "from-teal-400/20 to-emerald-500/15 border-teal-500/30 text-teal-400 bg-teal-950/35";
      case "Diamond": return "from-sky-400/25 to-blue-600/15 border-sky-450/40 text-sky-400 bg-sky-950/35";
      case "Mythic": return "from-violet-500/25 to-fuchsia-600/15 border-violet-500/40 text-violet-400 bg-violet-950/35 animate-pulse shadow-glow";
    }
  };

  const filteredAchievements = achievements.filter((ach) => {
    if (activeFilter === "completed") return ach.completed;
    if (activeFilter === "locked") return !ach.completed;
    return true;
  });

  return (
    <div id="achievements-tab-root" className="space-y-6">
      
      {/* Filters HUD */}
      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-3xl border border-slate-800">
        <div>
          <h3 className="text-sm font-mono text-indigo-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Award className="w-5 h-5" /> Hall of Accolades
          </h3>
          <p className="text-xs text-slate-400">Track and unlock rare badges of sustainable honor.</p>
        </div>

        <div className="flex gap-1.5">
          {(["all", "completed", "locked"] as const).map((flt) => (
            <button
              key={flt}
              onClick={() => setActiveFilter(flt)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold capitalize transition-colors cursor-pointer border ${
                activeFilter === flt
                  ? "bg-slate-950 border-slate-850 text-emerald-400"
                  : "bg-transparent border-transparent text-slate-500 hover:text-slate-350"
              }`}
            >
              {flt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid cabinet */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((ach) => {
          const style = getTierColor(ach.tier);
          const percent = Math.min(100, Math.floor((ach.progress / ach.target) * 100));
          
          return (
            <div
              key={ach.id}
              onClick={() => setSelectedAchievement(ach)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer bg-slate-900/40 relative overflow-hidden group hover:scale-101 border-slate-800 ${
                ach.completed 
                  ? "bg-gradient-to-r from-slate-950/80 to-slate-900" 
                  : "opacity-75"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  
                  {/* Badge Token visual */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border font-bold text-lg relative ${style}`}>
                    {ach.completed ? (
                      <span className="text-xl animate-spin-slow">{ach.unlockedIcon}</span>
                    ) : (
                      <Lock className="w-4 h-4 text-slate-600" />
                    )}
                    {ach.completed && (
                      <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-emerald-500 text-slate-950 px-1 py-0.2 rounded font-black font-mono">
                        ✓
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      {ach.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{ach.description}</p>
                    <span className={`text-[9px] font-mono leading-none tracking-widest font-black uppercase mt-1 inline-block bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900`}>
                      {ach.tier} Level Badge
                    </span>
                  </div>
                </div>

                {/* Progress Circle or checkbox */}
                <div className="text-right font-mono text-xs font-bold text-slate-500">
                  {ach.completed ? (
                    <span className="text-emerald-400 text-xs flex items-center gap-1 font-bold font-mono">
                      <CheckCircle className="w-4 h-4" /> Unlocked
                    </span>
                  ) : (
                    <span>{ach.progress}/{ach.target}</span>
                  )}
                </div>
              </div>

              {/* Progress track gauge */}
              {!ach.completed && (
                <div className="w-full bg-slate-950 h-1.5 rounded-full mt-4 overflow-hidden border border-slate-900/60">
                  <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected detailed Badge Pop up Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center relative overflow-hidden">
            {/* Spotlight decoration */}
            <div className="absolute top-[-30%] left-[-20%] w-72 h-72 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />

            <span className="text-5xl block mb-4 mt-2 animate-bounce">{selectedAchievement.unlockedIcon}</span>
            <span className="text-[9px] font-mono font-black uppercase tracking-widest bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-indigo-400 inline-block mb-3">
              {selectedAchievement.tier} Achievement Trophy
            </span>

            <h3 className="text-xl font-extrabold text-white tracking-tight">{selectedAchievement.title}</h3>
            <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">{selectedAchievement.description}</p>

            <div className="mt-6 bg-slate-950 border border-slate-900 rounded-2xl p-4">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">CURRENT MULTIPLIER VALUE</div>
              <div className="text-xl font-mono font-black text-emerald-400 mt-1">
                {selectedAchievement.completed ? "Unlock Bonus Applied: +15% Co2 multiplier" : "Locked (Bonus pending unlock)"}
              </div>
              <div className="mt-2 text-[10px] text-slate-500 leading-normal">
                Unlocked badges give passive bonuses during annual team campus clash events.
              </div>
            </div>

            <button
              id="dismiss-badge-modal"
              onClick={() => setSelectedAchievement(null)}
              className="mt-6 w-full bg-slate-950 hover:bg-slate-900 hover:text-white py-3 rounded-xl text-xs font-mono border border-slate-800 text-slate-400 active:scale-95 transition-all outline-none cursor-pointer"
            >
              Close Accolade
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
