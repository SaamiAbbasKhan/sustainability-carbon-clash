export interface UserStats {
  name: string;
  level: number;
  xp: number;
  xpNeeded: number;
  streak: number;
  greenCoins: number;
  streakFreezes: number;
  ecoPowerLevel: number;
  surveyCompleted: boolean;
  surveyData: SurveyAnswer | null;
  unlockedSkins?: string[];
  activeTheme?: string;
  activeBoost?: boolean;
  appName?: string;
  footerText?: string;
  trajectoryScale?: number;
  accumulatedCoins?: number;
}

export interface SurveyAnswer {
  transportation: "car" | "bike" | "walking" | "public";
  diet: "mixed" | "vegetarian" | "vegan";
  energy: "low" | "medium" | "high";
  shopping: "minimal" | "moderate" | "frequent";
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  category: "transportation" | "energy" | "waste" | "water" | "lifestyle";
  type: string;
  progress: number;
  target: number;
  unit: string;
  rewardXp: number;
  rewardCoins: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond" | "Mythic";
  badgeName: string;
  progress: number;
  target: number;
  completed: boolean;
  completedAt?: string;
  unlockedIcon: string;
}

export interface CityItem {
  id: string;
  type: "tree" | "solar_panel" | "wind_turbine" | "compost" | "garden" | "ev_station" | "smart_building" | "rail" | "smog_scrubber";
  x: number; // 0-7 grid
  y: number; // 0-7 grid
  level: number;
  name: string;
}

export interface CarbonLogItem {
  id: string;
  date: string;
  category: "transportation" | "diet" | "energy" | "shopping" | "waste";
  action: string;
  impactKgCo2: number; // Positive means saved, negative means added
  xpEarned: number;
  coinsEarned: number;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  level: number;
  xp: number;
  streak: number;
  badge: string;
  isSelf?: boolean;
}

export interface Friend {
  id: string;
  name: string;
  level: number;
  streak: number;
  avatarSeed: string;
  online: boolean;
  clashStatus: "none" | "challenged" | "challenging" | "active";
}

export interface SocialPost {
  id: string;
  userName: string;
  userBadge: string;
  userLevel: number;
  avatarSeed: string;
  time: string;
  message: string;
  type: "achievement" | "city_upgrade" | "streak";
  likes: number;
  liked: boolean;
  comments: { id: string; userName: string; text: string; time: string }[];
  shareData?: {
    statLine: string;
    description: string;
  };
}

export interface AppState {
  stats: UserStats;
  missions: DailyMission[];
  bossMission: DailyMission;
  achievements: Achievement[];
  cityItems: CityItem[];
  cityStage: number; // 1-5 (Polluted Town -> Future Green Civilization)
  carbonLogs: CarbonLogItem[];
  friends: Friend[];
  notifications: string[];
}
