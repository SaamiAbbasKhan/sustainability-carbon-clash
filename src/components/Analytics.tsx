import { useState } from "react";
import { 
  BarChart, 
  Leaf, 
  Flame, 
  TrendingDown, 
  Activity, 
  AlertCircle, 
  Calendar,
  Zap,
  Globe,
  Award
} from "lucide-react";
import { CarbonLogItem, UserStats } from "../types";

interface AnalyticsProps {
  stats: UserStats;
  logs: CarbonLogItem[];
}

export default function Analytics({ stats, logs }: AnalyticsProps) {
  const [activeRange, setActiveRange] = useState<"weekly" | "monthly" | "yearly">("weekly");

  // Calculate stats based on logs or generate stable baseline mock values
  const totalSavedWeight = logs.reduce((acc, curr) => acc + curr.impactKgCo2, 0);
  
  // Custom interactive SVG Line Chart plotting with dynamic Sandbox trajectory scaling multiplier
  const multiplier = stats.trajectoryScale ?? 1.0;

  // Real dynamic graph coordinates based on user logs which reset cleanly back to flat lines!
  const getWeeklyCumulative = () => {
    if (logs.length === 0) return [0, 0, 0, 0, 0, 0, 0];
    const base = [12.5, 18.2, 24.1, 31.8, 45.4, 52.8, 65.5];
    return base.map(val => Number((val * (0.4 + totalSavedWeight / 6.0)).toFixed(1)));
  };

  const getMonthlyCumulative = () => {
    if (logs.length === 0) return [0, 0, 0, 0, 0, 0];
    const base = [120, 145, 132, 168, 195, 210];
    return base.map(val => Number((val * (0.4 + totalSavedWeight / 6.0)).toFixed(1)));
  };

  const getYearlyCumulative = () => {
    if (logs.length === 0) return [0, 0, 0, 0];
    const base = [1200, 1380, 1550, 1820];
    return base.map(val => Number((val * (0.4 + totalSavedWeight / 6.0)).toFixed(1)));
  };

  const linePointsBase = activeRange === "weekly" 
    ? getWeeklyCumulative()
    : activeRange === "monthly"
      ? getMonthlyCumulative()
      : getYearlyCumulative();

  const linePoints = linePointsBase.map(val => Number((val * multiplier).toFixed(1)));

  const labels = activeRange === "weekly"
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : activeRange === "monthly"
      ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      : ["2023", "2024", "2025", "2026"];

  const buildSvgPath = () => {
    const width = 500;
    const height = 200;
    const padding = 30;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;
    
    const maxVal = Math.max(...linePoints) * 1.15 || 10;
    const pointsStr = linePoints.map((val, idx) => {
      const x = padding + (idx * (chartW / (linePoints.length - 1)));
      const y = height - padding - (val / maxVal * chartH);
      return `${x},${y}`;
    }).join(" ");

    return pointsStr;
  };

  // Categories percentage split
  const categories = [
    { name: "Transit Redirection", color: "text-emerald-400", bg: "bg-emerald-500", progress: 42, icon: "🚲" },
    { name: "Eco Dietary Choice", color: "text-indigo-400", bg: "bg-indigo-500", progress: 28, icon: "🥕" },
    { name: "Vigilant Power Saving", color: "text-sky-400", bg: "bg-sky-500", progress: 18, icon: "💡" },
    { name: "Precycling & Compost", color: "text-amber-400", bg: "bg-amber-500", progress: 12, icon: "📦" },
  ];

  return (
    <div id="analytics-tab-root" className="space-y-6">
      
      {/* Carbon Impact Scoreboard Hero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">CO₂ REDUCTION ACCRUED</div>
            <div className="text-3xl font-black text-white font-mono mt-1 flex items-center gap-1.5">
              {totalSavedWeight.toFixed(1)} <span className="text-xs text-emerald-400">KG</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Equivalent to planting {(totalSavedWeight * 0.05).toFixed(2)} maple saplings</p>
          </div>
          <div className="w-12 h-12 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">ECO POWER RATING</div>
            <div className="text-3xl font-black text-white font-mono mt-1">
              Level {stats.level}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">XP Power level: {stats.ecoPowerLevel} PWR</p>
          </div>
          <div className="w-12 h-12 bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">PREVENTATIVE FORECAST</div>
            <div className="text-3xl font-black text-rose-500 font-mono mt-1">
              -840.4 <span className="text-xs">KG/YR</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Projected net-positive lifestyle offset</p>
          </div>
          <div className="w-12 h-12 bg-rose-950/30 border border-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SVG Interactive Line Chart Card */}
        <div className="col-span-1 lg:col-span-8 p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" /> Carbon Offset Trajectory
              </h3>
              <p className="text-xs text-slate-400">Cumulative CO₂ emission savings (kg)</p>
            </div>
            
            <div className="flex gap-1 bg-slate-950 border border-slate-850 p-1 rounded-xl">
              {(["weekly", "monthly", "yearly"] as const).map((rng) => (
                <button
                  key={rng}
                  id={`range-${rng}`}
                  onClick={() => setActiveRange(rng)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-colors cursor-pointer ${
                    activeRange === rng 
                      ? "bg-slate-900 text-emerald-400 border border-slate-800" 
                      : "text-slate-500 hover:text-slate-350"
                  }`}
                >
                  {rng}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Line Drawing */}
          <div className="relative w-full overflow-hidden mt-4">
            <svg 
              viewBox="0 0 500 200" 
              className="w-full h-[220px] overflow-visible drop-shadow-[0_4px_12px_rgba(16,185,129,0.06)]"
            >
              {/* Grid Lines */}
              <line x1="30" y1="30" x2="470" y2="30" stroke="#1e293b" strokeDasharray="3,3" />
              <line x1="30" y1="110" x2="470" y2="110" stroke="#1e293b" strokeDasharray="3,3" />
              <line x1="30" y1="170" x2="470" y2="170" stroke="#121b2c" />

              {/* Smooth trend curve */}
              <polyline
                fill="none"
                stroke="url(#emissionsGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={buildSvgPath()}
                className="transition-all duration-700"
              />

              {/* Data Node points */}
              {linePoints.map((val, idx) => {
                const width = 500;
                const height = 200;
                const padding = 30;
                const chartW = width - padding * 2;
                const chartH = height - padding * 2;
                const maxVal = Math.max(...linePoints) * 1.15 || 10;

                const x = padding + (idx * (chartW / (linePoints.length - 1)));
                const y = height - padding - (val / maxVal * chartH);

                return (
                  <g key={idx} className="group cursor-pointer">
                    <circle 
                      cx={x} 
                      cy={y} 
                      r="6" 
                      className="fill-slate-950 stroke-emerald-400 stroke-[3] hover:r-8 transition-all" 
                    />
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      className="fill-slate-300 font-mono text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 px-1"
                    >
                      {val}kg
                    </text>
                  </g>
                );
              })}

              <defs>
                <linearGradient id="emissionsGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>

            {/* X Axis Labels */}
            <div className="flex justify-between px-6 pl-8 pr-8 mt-2">
              {labels.map((lbl, i) => (
                <span key={i} className="text-[10px] font-mono text-slate-500">{lbl}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Division split pie proxy donut */}
        <div className="col-span-1 lg:col-span-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              <BarChart className="w-4 h-4 text-indigo-400" /> Sector Allocations
            </h3>
            <p className="text-xs text-slate-400 mb-6">Distribution of your active offsets</p>
          </div>

          <div className="space-y-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span>{cat.icon}</span> {cat.name}
                  </span>
                  <span className={cat.color}>{cat.progress}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/40">
                  <div className={`h-full ${cat.bg} rounded-full`} style={{ width: `${cat.progress}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 text-[10px] text-slate-400 mt-6 flex items-start gap-2 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <span>Adding 2 wind vanes or 1 smart building in the Virtual City will elevate your vigilant power offset multiplier by 15% next week.</span>
          </div>
        </div>

      </div>

      {/* Epic projected annual leaderboard progress visual mockup */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
        <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-sky-400" /> Annual Impact vs Average Households
        </h3>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Standard Typical Student Household (Car + Mixed Diet)</span>
              <span className="font-mono text-slate-300">4,800 kg CO₂ / yr</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full border border-slate-800">
              <div className="h-full bg-rose-500 w-full rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-emerald-400 mb-1.5 font-bold">
              <span>Your Custom Clash Profile (Active Quests + City Upgrades)</span>
              <span className="font-mono">3,120 kg CO₂ / yr (Saved -35% 🔥)</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full border border-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 w-[65%] rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
