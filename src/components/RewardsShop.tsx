import { useState } from "react";
import { 
  Coins, 
  Flame, 
  Sparkles, 
  Sun, 
  TrendingUp, 
  Lock, 
  Palette, 
  Zap, 
  Heart 
} from "lucide-react";

interface RewardsShopProps {
  currentCoins: number;
  streakFreezes: number;
  unlockedSkins?: string[];
  onPurchaseFreeze: (cost: number) => void;
  onBuyCosmetic: (cost: number, name: string, id: string) => void;
}

interface ShopItem {
  id: string;
  name: string;
  cost: number;
  description: string;
  symbol: string;
  category: "utility" | "boost" | "theme";
  unlockedAtLevel: number;
}

const GENERAL_STORE: ShopItem[] = [
  { id: "streak_freeze", name: "Duolingo Streak Freeze", cost: 35, description: "Maintains your custom active habit streak multiplier even if you miss logging in today.", symbol: "❄️", category: "utility", unlockedAtLevel: 1 },
  { id: "carbon_multiplier", name: "CO₂ Catalyst Boost", cost: 90, description: "Gives +20% bonus passive coin generation from all trees in the virtual city for 3 days.", symbol: "🧪", category: "boost", unlockedAtLevel: 3 },
  { id: "golden_skin", name: "Gold Plated Townhall", cost: 200, description: "Exclusive luxury skin overlay for your virtual city hall. Sparks golden wind trails.", symbol: "🏛️", category: "theme", unlockedAtLevel: 5 },
  { id: "cyber_theme", name: "Cyberpunk Grid Theme", cost: 150, description: "Transforms grid borders into animated bright purple neon bars with hover micro-shatters.", symbol: "🌌", category: "theme", unlockedAtLevel: 4 },
  { id: "maglev_boost", name: "High-Speed Rail Blueprint", cost: 340, description: "Unlocks futuristic hover-train structures generating heavy passive Green Coins.", symbol: "🚄", category: "boost", unlockedAtLevel: 8 },
];

export default function RewardsShop({ currentCoins, streakFreezes, unlockedSkins = [], onPurchaseFreeze, onBuyCosmetic }: RewardsShopProps) {
  const [activeSegment, setActiveSegment] = useState<"all" | "utility" | "theme">("all");

  const handleBuy = (item: ShopItem) => {
    // If they already unlocked this non-utility item, prevent buying again:
    if (item.id !== "streak_freeze" && unlockedSkins.includes(item.id)) {
      return;
    }

    if (currentCoins < item.cost) {
      return;
    }

    if (item.id === "streak_freeze") {
      if (streakFreezes >= 3) {
        return;
      }
      onPurchaseFreeze(item.cost);
    } else {
      onBuyCosmetic(item.cost, item.name, item.id);
    }
  };

  const filteredItems = GENERAL_STORE.filter(item => {
    if (activeSegment === "all") return true;
    return item.category === activeSegment;
  });

  return (
    <div id="rewards-shop-root" className="space-y-6">
      
      {/* HUD Balance */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600/20 to-orange-500/10 border border-amber-500/20 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        
        {/* SPECULAR SHINE overlay */}
        <div className="absolute top-0 right-[-10%] w-56 h-36 bg-amber-400/10 rotate-12 blur-xl pointer-events-none" />

        <div>
          <div className="text-[10px] font-mono text-amber-450 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Coins className="w-4 h-4 text-amber-400" /> Green Coins Vault
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
            Green Coins: <span className="font-mono text-amber-400 font-black">{currentCoins} C</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Spend Green Coins on shields, passive multiplier amplifiers, and customized cosmetics for your virtual grid.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/80 p-3 rounded-2xl border border-slate-900 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
            <div>
              <span className="text-[9px] font-mono text-slate-500 uppercase block leading-none">STREAK FREEZES</span>
              <span className="text-sm font-mono font-black text-slate-200">{streakFreezes} Equipped</span>
            </div>
          </div>
        </div>

      </div>

      {/* Segment filters */}
      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">ECO STOREFRONT CATALOG</span>
        </div>
        <div className="flex gap-1">
          {(["all", "utility", "theme"] as const).map((seg) => (
            <button
              key={seg}
              onClick={() => setActiveSegment(seg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-colors cursor-pointer ${
                activeSegment === seg
                  ? "bg-slate-950 text-amber-400"
                  : "text-slate-500 hover:text-slate-350"
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Item Blocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const isAffordable = currentCoins >= item.cost;
          return (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-slate-900/40 border border-slate-850/80 hover:border-slate-800 transition-all flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl p-3 bg-slate-950 border border-slate-850 rounded-2xl">{item.symbol}</span>
                <div>
                  <h4 className="text-sm font-extrabold text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-450 mt-1 leading-relaxed line-clamp-2">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-900 pt-4 mt-2">
                <div className="flex items-center gap-1">
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-mono font-extrabold text-amber-400">{item.cost} C</span>
                </div>

                {item.id === "streak_freeze" && streakFreezes >= 3 ? (
                  <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-950/40 border border-slate-800 px-3 py-1.5 rounded-xl uppercase">
                    Max Limit (3/3)
                  </span>
                ) : item.id !== "streak_freeze" && unlockedSkins.includes(item.id) ? (
                  <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-3 py-1.5 rounded-xl uppercase shadow-glow">
                    Equipped ✓
                  </span>
                ) : (
                  <button
                    id={`purchase-item-${item.id}`}
                    onClick={() => handleBuy(item)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      isAffordable 
                        ? "bg-amber-400 hover:bg-amber-300 text-slate-950 animate-pulse" 
                        : "bg-slate-950 text-slate-650 border border-slate-900 cursor-not-allowed"
                    }`}
                    disabled={!isAffordable}
                  >
                    Buy Item
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
