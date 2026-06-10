import { useState } from "react";
import { 
  Trophy, 
  Flame, 
  ChevronRight, 
  Award, 
  TrendingUp, 
  Compass, 
  Sparkles, 
  User, 
  School, 
  Globe 
} from "lucide-react";
import { LeaderboardUser } from "../types";

interface LeaderboardProps {
  currentUsername: string;
  currentLevel: number;
  currentXp: number;
  currentStreak: number;
}

export default function Leaderboard({ currentUsername, currentLevel, currentXp, currentStreak }: LeaderboardProps) {
  const [boardType, setBoardType] = useState<"global" | "college" | "friends">("global");
  const [timeframe, setTimeframe] = useState<"weekly" | "all-time">("weekly");

  // Mock competitive leaderboard metrics
  const globalUsers: LeaderboardUser[] = [
    { rank: 1, name: "EcoBoss_99", level: 24, xp: 9550, streak: 42, badge: "Legendary" },
    { rank: 2, name: "GretaWarrior", level: 19, xp: 6200, streak: 31, badge: "Master" },
    { rank: 3, name: "CycleSprint", level: 15, xp: 4800, streak: 25, badge: "Elite" },
    { rank: 4, name: "GreenPower4", level: 14, xp: 3950, streak: 12, badge: "Veteran" },
    { rank: 5, name: currentUsername || "Saami", level: currentLevel, xp: currentXp, streak: currentStreak, badge: "Warrior", isSelf: true },
    { rank: 6, name: "WindVaneFan", level: 11, xp: 3100, streak: 9, badge: "Warrior" },
    { rank: 7, name: "ZeroWasteSam", level: 9, xp: 2240, streak: 5, badge: "Novice" },
  ];

  const collegeUsers: LeaderboardUser[] = [
    { rank: 1, name: "StanfordEcoGamer", level: 16, xp: 5400, streak: 19, badge: "Elite" },
    { rank: 2, name: currentUsername || "Saami", level: currentLevel, xp: currentXp, streak: currentStreak, badge: "Warrior", isSelf: true },
    { rank: 3, name: "UCLA_GreenClub", level: 10, xp: 2900, streak: 8, badge: "Warrior" },
    { rank: 4, name: "MIT_FusionHub", level: 8, xp: 1950, streak: 4, badge: "Novice" },
  ];

  const friendsUsers: LeaderboardUser[] = [
    { rank: 1, name: "AlexCommute", level: 13, xp: 3720, streak: 18, badge: "Warrior" },
    { rank: 2, name: currentUsername || "Saami", level: currentLevel, xp: currentXp, streak: currentStreak, badge: "Warrior", isSelf: true },
    { rank: 3, name: "SaraCompost", level: 11, xp: 3200, streak: 14, badge: "Warrior" },
    { rank: 4, name: "BenBikeSprints", level: 10, xp: 2900, streak: 3, badge: "Novice" },
  ];

  const getActiveList = () => {
    switch (boardType) {
      case "college":
        return collegeUsers;
      case "friends":
        return friendsUsers;
      case "global":
      default:
        return globalUsers;
    }
  };

  const usersList = getActiveList();

  return (
    <div id="leaderboard-tab-root" className="space-y-6">
      
      {/* Top filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-4 rounded-3xl border border-slate-800">
        <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto">
          {[
            { id: "global", label: "World", icon: <Globe className="w-3.5 h-3.5" /> },
            { id: "college", label: "University", icon: <School className="w-3.5 h-3.5" /> },
            { id: "friends", label: "Friends Lobby", icon: <User className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setBoardType(tab.id as any)}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                boardType === tab.id
                  ? "bg-slate-950 text-emerald-400 border border-slate-800/80 shadow-inner"
                  : "text-slate-500 hover:text-slate-350"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-1 bg-slate-950 p-1 border border-slate-850 rounded-xl w-full sm:w-auto">
          {[
            { id: "weekly", label: "Weekly Clash" },
            { id: "all-time", label: "All-Time XP" },
          ].map((time) => (
            <button
              key={time.id}
              onClick={() => setTimeframe(time.id as any)}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                timeframe === time.id
                  ? "bg-slate-900 border border-slate-800 text-slate-200"
                  : "text-slate-500 hover:text-slate-400"
              }`}
            >
              {time.label}
            </button>
          ))}
        </div>
      </div>

      {/* Podium Cards for Top 3 */}
      <div className="grid grid-cols-3 gap-3 items-end pt-4 max-w-lg mx-auto">
        
        {/* Silver Rank 2 */}
        {usersList[1] && (
          <div className="flex flex-col items-center">
            <div className="text-xl font-mono font-black text-slate-400 mb-1">2nd</div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-t-2xl p-4 w-full text-center h-[120px] flex flex-col justify-between hover:border-slate-500/20 transition-all">
              <div className="text-xl">🥈</div>
              <p className="text-xs font-black text-slate-200 truncate">{usersList[1].name}</p>
              <div className="text-[10px] font-mono text-slate-400">LVL {usersList[1].level}</div>
            </div>
          </div>
        )}

        {/* Gold Rank 1 */}
        {usersList[0] && (
          <div className="flex flex-col items-center">
            <div className="text-3xl font-black text-yellow-400 animate-bounce mb-1">👑</div>
            <div className="bg-gradient-to-t from-yellow-500/10 to-transparent border border-yellow-500/30 rounded-t-3xl p-5 w-full text-center h-[160px] flex flex-col justify-between shadow-lg shadow-yellow-500/5 hover:border-yellow-400/50 transition-all relative">
              <span className="absolute top-1 right-2 text-[10px] font-black text-yellow-400 font-mono animate-pulse">1st</span>
              <div className="text-3xl">🥇</div>
              <p className="text-sm font-black text-white truncate">{usersList[0].name}</p>
              <div className="text-xs font-mono font-bold text-yellow-400">LVL {usersList[0].level}</div>
            </div>
          </div>
        )}

        {/* Bronze Rank 3 */}
        {usersList[2] && (
          <div className="flex flex-col items-center">
            <div className="text-xl font-mono font-black text-amber-600 mb-1">3rd</div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-t-2xl p-4 w-full text-center h-[100px] flex flex-col justify-between hover:border-amber-600/20 transition-all">
              <div className="text-xl">🥉</div>
              <p className="text-xs font-black text-slate-300 truncate">{usersList[2].name}</p>
              <div className="text-[10px] font-mono text-slate-400">LVL {usersList[2].level}</div>
            </div>
          </div>
        )}

      </div>

      {/* Main Leaderboard List Table */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 overflow-hidden divide-y divide-slate-900">
        {usersList.map((usr) => (
          <div
            key={usr.rank}
            className={`p-4 flex items-center justify-between transition-all ${
              usr.isSelf 
                ? "bg-emerald-500/10 border-l-4 border-l-emerald-500 shadow-inner" 
                : "hover:bg-slate-900/30"
            }`}
          >
            {/* Rank and User logo info */}
            <div className="flex items-center gap-4">
              <span className="w-6 font-mono text-xs font-extrabold text-slate-500 text-center">
                {usr.rank}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {usr.name}
                  {usr.isSelf && (
                    <span className="text-[9px] bg-emerald-500 text-slate-950 font-mono font-black uppercase px-1.5 py-0.5 rounded">
                      YOU
                    </span>
                  )}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-0.5">
                    <Award className="w-3 h-3 text-indigo-400" /> {usr.badge}
                  </span>
                  <span className="text-slate-700 text-xs">•</span>
                  <span className="text-[10px] font-mono text-slate-500">LVL {usr.level}</span>
                </div>
              </div>
            </div>

            {/* Streak and XP information */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 text-xs text-amber-500 font-mono font-bold" title="Daily streak multiplier active">
                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                <span>{usr.streak}d</span>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-black text-slate-200">
                  {usr.xp.toLocaleString()} <span className="text-[10px] text-indigo-400 font-normal">XP</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* College Clash Event Banner */}
      {boardType === "college" && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 to-transparent border border-red-900/30 text-xs text-red-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <School className="w-6 h-6 text-red-400 animate-pulse" />
            <div>
              <span className="font-extrabold">🚨 ANNUAL SUNDOWN CAMPUS BATTLE: </span>
              Your college is currently lagging by <span className="font-bold underline">12,400 XP</span> as of this afternoon. Swap 3 car commutes to walking today!
            </div>
          </div>
          <button
            id="contribute-xp-btn"
            className="px-3 py-1.5 bg-red-500 text-slate-950 font-black rounded-lg text-[10px] uppercase font-mono tracking-wider active:scale-95 transition-all cursor-pointer hover:bg-red-400"
          >
            CLASH NOW
          </button>
        </div>
      )}
    </div>
  );
}
