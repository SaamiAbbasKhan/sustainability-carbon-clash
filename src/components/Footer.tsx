import { ShieldAlert } from "lucide-react";

interface FooterProps {
  footerText?: string;
}

export default function Footer({ footerText = "Carbon Clash Engine v4.0.1" }: FooterProps) {
  return (
    <footer className="w-full mt-12 mb-6 border-t border-white/5 pt-6 text-zinc-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-2">
      <div className="flex items-center gap-2.5">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-glow"></div>
        <p className="text-xs">AI Coach Chip: <span className="text-zinc-400 italic">"Clean up smog, plant trees, and generate coins passively. You're on fire!"</span></p>
      </div>
      
      <div className="flex items-center gap-6 flex-wrap justify-center md:justify-end text-[10px] tracking-widest uppercase text-zinc-500 font-mono">
        <span>{footerText}</span>
        <span className="text-emerald-400 font-bold border-b border-emerald-450/20">Designed by Saami Abbas Khan</span>
      </div>
    </footer>
  );
}

