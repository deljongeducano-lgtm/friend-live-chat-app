import { useState, useEffect, useRef } from 'react';
import { 
  Eye, Heart, Crown, Diamond, Car, Gem, Castle, Flame,
  Gift, Swords, Mic, MessageCircle, MoreHorizontal, Users,
  Zap, Trophy, Star, X, Play, Settings, Volume2, Ban, UserX, Timer,
  Sparkles, FlameKindling, Shield, BadgeCheck, Wand2, Hexagon
} from 'lucide-react';

type GiftItem = {
  id: string;
  name: string;
  icon: any;
  emoji: string;
  cost: number;
  color: string;
  rare?: boolean;
};

type ChatMsg = {
  id: string;
  type: 'chat' | 'enter' | 'gift' | 'system';
  user: string;
  level: number;
  text: string;
  gift?: GiftItem;
  color?: string;
};

type Gifter = {
  id: string;
  name: string;
  avatar: string;
  level: number;
  beans: number;
  gifts: number;
};

type FamBadgeStyle = {
  id: string;
  name: string;
  icon: any;
  bg: string;
  border: string;
  glow: string;
  light: string;
};

type Family = {
  id: string;
  name: string;
  tag: string;
  badge: FamBadgeStyle;
  owner: string;
  members: number;
  level: number;
  createdAt: string;
};

const GIFTS: GiftItem[] = [
  { id: 'rose', name: 'Rose', icon: Heart, emoji: '🌹', cost: 1, color: 'from-pink-400 to-rose-500' },
  { id: 'heart', name: 'Heart', icon: Heart, emoji: '💖', cost: 9, color: 'from-pink-500 to-red-500' },
  { id: 'crown', name: 'Crown', icon: Crown, emoji: '👑', cost: 99, color: 'from-amber-400 to-yellow-600' },
  { id: 'diamond', name: 'Diamond', icon: Diamond, emoji: '💎', cost: 199, color: 'from-cyan-400 to-blue-500' },
  { id: 'car', name: 'Super Car', icon: Car, emoji: '🏎️', cost: 999, color: 'from-violet-500 to-purple-600', rare: true },
  { id: 'yacht', name: 'Yacht', icon: Gem, emoji: '🛥️', cost: 1999, color: 'from-blue-500 to-indigo-600', rare: true },
  { id: 'castle', name: 'Castle', icon: Castle, emoji: '🏰', cost: 4999, color: 'from-fuchsia-500 to-purple-600', rare: true },
  { id: 'dragon', name: 'Dragon', icon: Flame, emoji: '🐉', cost: 9999, color: 'from-orange-500 to-red-600', rare: true },
];

const FAM_BADGES: FamBadgeStyle[] = [
  { id: 'royal', name: 'Royal Crown', icon: Crown, bg: 'from-amber-400 to-orange-500', border: 'border-amber-400/50', glow: 'shadow-[0_0_20px_rgba(251,146,60,0.4)]', light: 'from-amber-400/20 to-orange-500/20' },
  { id: 'diamond', name: 'Diamond Elite', icon: Diamond, bg: 'from-cyan-400 to-blue-600', border: 'border-cyan-400/50', glow: 'shadow-[0_0_20px_rgba(34,211,238,0.4)]', light: 'from-cyan-400/20 to-blue-600/20' },
  { id: 'inferno', name: 'Inferno', icon: Flame, bg: 'from-orange-500 to-red-600', border: 'border-orange-500/50', glow: 'shadow-[0_0_20px_rgba(249,115,22,0.4)]', light: 'from-orange-500/20 to-red-600/20' },
  { id: 'crystal', name: 'Crystal Fam', icon: Gem, bg: 'from-fuchsia-500 to-purple-600', border: 'border-fuchsia-400/50', glow: 'shadow-[0_0_20px_rgba(232,121,249,0.4)]', light: 'from-fuchsia-500/20 to-purple-600/20' },
  { id: 'champion', name: 'Champion', icon: Trophy, bg: 'from-emerald-400 to-teal-600', border: 'border-emerald-400/50', glow: 'shadow-[0_0_20px_rgba(52,211,153,0.4)]', light: 'from-emerald-400/20 to-teal-600/20' },
  { id: 'starlight', name: 'Starlight', icon: Star, bg: 'from-pink-400 to-violet-600', border: 'border-pink-400/50', glow: 'shadow-[0_0_20px_rgba(244,114,182,0.4)]', light: 'from-pink-400/20 to-violet-600/20' },
];

const MOCK_FAMILIES: Family[] = [
  { id: 'f1', name: 'Legends United', tag: 'LGND', badge: FAM_BADGES[0], owner: 'RichieRich', members: 324, level: 18, createdAt: '2024' },
  { id: 'f2', name: 'Diamond Queens', tag: 'DQ', badge: FAM_BADGES[3], owner: 'QueenBee', members: 189, level: 15, createdAt: '2024' },
  { id: 'f3', name: 'Night Owls', tag: 'NO', badge: FAM_BADGES[5], owner: 'NightOwl', members: 98, level: 12, createdAt: '2025' },
];

const MOCK_USERS = ['AlexVibe', 'QueenBee', 'CryptoKing', 'LunaStar', 'TurboX', 'MikaFan99', 'LegendaryUser', 'NightOwl', 'BeastMode', 'Sakura', 'DiamondBoy', 'RichieRich'];
const MOCK_TEXTS = [
  'You are amazing Mika! 😍',
  'Wow so beautiful today',
  'PK please!!!',
  'Where are you from?',
  'Love your voice',
  '🔥🔥🔥🔥🔥',
  'Can you sing that song?',
  'Followed! Follow back?',
  'OMG that gift!!!',
  'Host is on fire tonight',
  'Best live ever',
  '❤️❤️❤️',
];

const LEADERBOARD: Gifter[] = [
  { id: '1', name: 'RichieRich', avatar: 'https://i.pravatar.cc/100?img=11', level: 54, beans: 128400, gifts: 342 },
  { id: '2', name: 'CryptoKing', avatar: 'https://i.pravatar.cc/100?img=12', level: 48, beans: 96500, gifts: 210 },
  { id: '3', name: 'QueenBee', avatar: 'https://i.pravatar.cc/100?img=5', level: 42, beans: 72300, gifts: 189 },
  { id: '4', name: 'AlexVibe', avatar: 'https://i.pravatar.cc/100?img=8', level: 38, beans: 45200, gifts: 98 },
  { id: '5', name: 'DiamondBoy', avatar: 'https://i.pravatar.cc/100?img=15', level: 32, beans: 38900, gifts: 76 },
  { id: '6', name: 'LunaStar', avatar: 'https://i.pravatar.cc/100?img=9', level: 29, beans: 22400, gifts: 54 },
];

export default function App() {
  const [beans, setBeans] = useState(45200);
  const [diamonds] = useState(12580);
  const [viewerCount, setViewerCount] = useState(12437);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat'|'rank'|'fans'|'fam'>('chat');
  const [isGiftPanelOpen, setIsGiftPanelOpen] = useState(true);
  const [selectedGift, setSelectedGift] = useState<GiftItem>(GIFTS[0]);
  const [giftAnim, setGiftAnim] = useState<{gift: GiftItem, combo: number} | null>(null);
  const [combo, setCombo] = useState(0);
  const lastGiftRef = useRef<string>('');
  const comboTimeoutRef = useRef<any>(null);
  const [chatInput, setChatInput] = useState('');
  const [isHostMode, setIsHostMode] = useState(false);
  const [showInsufficient, setShowInsufficient] = useState(false);
  // Fam System State
  const [families, setFamilies] = useState<Family[]>(MOCK_FAMILIES);
  const [myFamily, setMyFamily] = useState<Family | null>(null);
  const [showFamModal, setShowFamModal] = useState(false);
  const [famName, setFamName] = useState('');
  const [famTag, setFamTag] = useState('');
  const [selectedBadge, setSelectedBadge] = useState<FamBadgeStyle>(FAM_BADGES[5]);
  const [famToast, setFamToast] = useState<string | null>(null);
  const [famSearch, setFamSearch] = useState('');
  
  // PK State
  const [pkActive, setPkActive] = useState(false);
  const [pkTimer, setPkTimer] = useState(60);
  const [pkScores, setPkScores] = useState({ left: 42500, right: 38200 });
  const [pkWinner, setPkWinner] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: '0', type: 'system', user: 'System', level: 0, text: 'Welcome to Mika Live! Be respectful and have fun 🎉' },
    { id: '1', type: 'enter', user: 'LegendaryUser', level: 60, text: 'entered the room', color: 'from-amber-400 to-orange-500' },
    { id: '2', type: 'chat', user: 'QueenBee', level: 42, text: 'Mika you look stunning tonight! 😍' },
    { id: '3', type: 'gift', user: 'RichieRich', level: 54, text: 'sent', gift: GIFTS[7] },
    { id: '4', type: 'chat', user: 'AlexVibe', level: 38, text: 'Song request please! Can you sing?' },
    { id: '5', type: 'enter', user: 'CryptoKing', level: 48, text: 'entered the room - Lv 48 Legend!', color: 'from-violet-500 to-purple-600' },
    { id: '6', type: 'chat', user: 'Sakura', level: 21, text: '❤️❤️❤️❤️❤️' },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mock real-time chat
  useEffect(() => {
    const interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.65) {
        const user = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
        const text = MOCK_TEXTS[Math.floor(Math.random() * MOCK_TEXTS.length)];
        const level = Math.floor(Math.random() * 50) + 5;
        setMessages(m => [...m.slice(-60), {
          id: Date.now().toString(),
          type: 'chat',
          user,
          level,
          text
        }]);
      } else if (rnd < 0.85) {
        const user = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
        setMessages(m => [...m.slice(-60), {
          id: Date.now().toString(),
          type: 'enter',
          user,
          level: Math.floor(Math.random() * 30) + 30,
          text: 'entered the room',
          color: Math.random() > 0.5 ? 'from-pink-500 to-violet-500' : 'from-amber-400 to-orange-500'
        }]);
      } else {
        const user = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
        const gift = GIFTS[Math.floor(Math.random() * 4)];
        setMessages(m => [...m.slice(-60), {
          id: Date.now().toString(),
          type: 'gift',
          user,
          level: Math.floor(Math.random() * 40) + 10,
          text: `sent ${gift.name}`,
          gift
        }]);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Viewer count ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(v => v + Math.floor(Math.random() * 40) - 15);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // PK timer
  useEffect(() => {
    if (!pkActive || pkWinner) return;
    const interval = setInterval(() => {
      setPkTimer(t => {
        if (t <= 1) {
          const winner = pkScores.left > pkScores.right ? 'left' : 'right';
          setPkWinner(winner);
          setTimeout(() => {
            setPkActive(false);
            setPkWinner(null);
            setPkTimer(60);
          }, 4000);
          return 0;
        }
        return t - 1;
      });
      // random score bumps
      if (Math.random() > 0.4) {
        setPkScores(s => ({
          left: s.left + Math.floor(Math.random() * 500),
          right: s.right + Math.floor(Math.random() * 500),
        }));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [pkActive, pkScores, pkWinner]);

  const handleSendGift = (gift: GiftItem) => {
    if (beans < gift.cost) {
      setShowInsufficient(true);
      setTimeout(() => setShowInsufficient(false), 2000);
      return;
    }
    setBeans(b => b - gift.cost);
    setSelectedGift(gift);
    
    // combo logic
    if (lastGiftRef.current === gift.id) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      setGiftAnim({ gift, combo: newCombo });
    } else {
      setCombo(1);
      setGiftAnim({ gift, combo: 1 });
      lastGiftRef.current = gift.id;
    }
    
    if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
    comboTimeoutRef.current = setTimeout(() => {
      setCombo(0);
      lastGiftRef.current = '';
    }, 4000);

    setPkScores(s => ({ ...s, left: s.left + gift.cost * 10 }));
    
    setMessages(m => [...m.slice(-60), {
      id: Date.now().toString(),
      type: 'gift',
      user: 'You',
      level: 32,
      text: `sent ${gift.name} x${combo > 0 ? combo + 1 : 1}`,
      gift
    }]);

    setTimeout(() => setGiftAnim(null), 2500);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setMessages(m => [...m.slice(-60), {
      id: Date.now().toString(),
      type: 'chat',
      user: 'You',
      level: 32,
      text: chatInput
    }]);
    setChatInput('');
  };

  const startPK = () => {
    setPkActive(true);
    setPkTimer(60);
    setPkScores({ left: 12400, right: 11800 });
    setPkWinner(null);
  };

  const handleCreateFam = () => {
    if (!famName.trim() || !famTag.trim()) return;
    if (famTag.length < 2 || famTag.length > 4) return;
    const newFam: Family = {
      id: Date.now().toString(),
      name: famName.trim(),
      tag: famTag.trim().toUpperCase(),
      badge: selectedBadge,
      owner: 'You',
      members: 1,
      level: 1,
      createdAt: new Date().getFullYear().toString(),
    };
    setFamilies(prev => [newFam, ...prev]);
    setMyFamily(newFam);
    setShowFamModal(false);
    setFamName('');
    setFamTag('');
    setFamToast(`Fam Created Successfully! [${newFam.tag}] Badge is FREE for early founders 🎉`);
    setTimeout(() => setFamToast(null), 4000);
    // Auto switch to Fam tab to see it
    setActiveTab('fam');
  };

  const filteredFamilies = families.filter(f => 
    f.name.toLowerCase().includes(famSearch.toLowerCase()) || 
    f.tag.toLowerCase().includes(famSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col overflow-hidden select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');
        * { font-family: 'Outfit', sans-serif; }
        .bigo-font { font-family: 'Space Grotesk', sans-serif; }
        .scroll-hide::-webkit-scrollbar { display: none; }
        .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(-400px) scale(1.2); opacity: 0; }
        }
        @keyframes giftPop {
          0% { transform: scale(0) rotate(-10deg); }
          50% { transform: scale(1.3) rotate(5deg); }
          70% { transform: scale(0.95) rotate(-2deg); }
          100% { transform: scale(1) rotate(0); }
        }
        @keyframes pulseLive {
          0%,100% { opacity: 1; } 50% { opacity: 0.5; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); } 100% { transform: translateX(200%); }
        }
        @keyframes famEntrance {
          0% { transform: scale(0.9) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes famGlow {
          0%,100% { box-shadow: 0 0 20px rgba(255,46,147,0.3); }
          50% { box-shadow: 0 0 30px rgba(255,46,147,0.5), 0 0 40px rgba(124,58,237,0.3); }
        }
      `}</style>

      {/* Header */}
      <header className="h-[56px] md:h-[64px] bg-[#111117] border-b border-white/[0.06] flex items-center justify-between px-3 md:px-6 z-20 shrink-0">
        <div className="flex items-center gap-3 md:gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-[#ff2e93] to-[#7c3aed] flex items-center justify-center shadow-[0_0_20px_rgba(255,46,147,0.4)]">
              <Play className="w-4 h-4 fill-white text-white ml-[1px]" />
            </div>
            <span className="bigo-font font-bold text-[18px] md:text-[20px] tracking-tight">BIGO<span className="text-[#ff2e93]"> LIVE</span></span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[12px] text-white/40">
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>LIVE NOW • 8.2k broadcasters</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* FAM Button - FREE */}
          <button
            onClick={() => setShowFamModal(true)}
            className="relative flex items-center gap-1.5 pl-2.5 pr-3 h-7 md:h-8 rounded-full bg-gradient-to-r from-[#ff2e93] to-[#7c3aed] border border-white/20 shadow-[0_0_16px_rgba(255,46,147,0.4)] hover:shadow-[0_0_24px_rgba(255,46,147,0.6)] hover:scale-[1.02] transition-all group"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <Users className="w-3 h-3 text-white" />
            </div>
            <span className="text-[11px] md:text-xs font-bold tracking-wide">FAM</span>
            <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-white text-[8px] font-black text-[#ff2e93] leading-none">FREE</span>
            {myFamily && (
              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${myFamily.badge.bg} border-2 border-[#111117] flex items-center justify-center`}>
                <myFamily.badge.icon className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </button>

          {/* Level */}
          <div className="flex items-center gap-1.5 px-2.5 md:px-3 h-7 md:h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_12px_rgba(251,146,60,0.3)]">
            <Crown className="w-3.5 h-3.5 text-white" />
            <span className="text-[11px] md:text-xs font-bold text-white">Lv 32</span>
          </div>
          
          {/* Diamonds */}
          <div className="flex items-center gap-1.5 px-2.5 md:px-3 h-7 md:h-8 rounded-full bg-white/[0.08] border border-white/[0.08] backdrop-blur">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 flex items-center justify-center">
              <Diamond className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="text-[11px] md:text-xs font-semibold">{diamonds.toLocaleString()}</span>
          </div>

          {/* Beans */}
          <div className="flex items-center gap-1.5 px-2.5 md:px-3 h-7 md:h-8 rounded-full bg-white/[0.08] border border-white/[0.08] backdrop-blur">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center">
              <span className="text-[9px]">🫘</span>
            </div>
            <span className="text-[11px] md:text-xs font-semibold">{(beans/1000).toFixed(1)}k</span>
          </div>

          <div className="w-px h-5 bg-white/10 hidden md:block mx-1" />

          {/* Host toggle */}
          <button
            onClick={() => setIsHostMode(!isHostMode)}
            className={`h-7 md:h-8 px-3 rounded-full text-[11px] md:text-xs font-semibold transition-all border ${isHostMode ? 'bg-[#ff2e93] border-[#ff2e93] text-white shadow-[0_0_12px_rgba(255,46,147,0.4)]' : 'bg-white/[0.06] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.1]'}`}
          >
            {isHostMode ? 'HOST' : 'VIEWER'}
          </button>

          <img src="https://i.pravatar.cc/100?img=32" alt="me" className="w-8 h-8 md:w-9 md:h-9 rounded-full ring-2 ring-[#ff2e93]/30 object-cover" />
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 flex flex-col bg-[#0a0a0f] relative min-h-[50vh] lg:min-h-0">
          <div className="flex-1 relative overflow-hidden bg-[#12121a] lg:rounded-br-[24px]">
            {/* Video Background - Mock Live */}
            <div className="absolute inset-0">
              {/* gradient mesh */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a102e] via-[#12121a] to-[#0f172a]" />
              <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#ff2e93]/20 blur-[100px]" />
              <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/20 blur-[100px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#ff2e93]/[0.07] blur-[120px]" />
              
              {/* Host image center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff2e93]/30 to-[#7c3aed]/30 rounded-[32px] blur-2xl scale-110" />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=face"
                    alt="Mika"
                    className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] object-cover rounded-[24px] md:rounded-[32px] shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-[24px] md:rounded-[32px] bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* subtle noise */}
              <div className="absolute inset-0 opacity-[0.015]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`}} />
            </div>

            {/* PK Overlay */}
            {pkActive && (
              <div className="absolute inset-0 z-10 flex">
                {/* Left host */}
                <div className="flex-1 relative overflow-hidden border-r-2 border-[#ff2e93]/50">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=face" className="w-full h-full object-cover" alt="host1" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="h-2 bg-black/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#ff2e93] to-pink-400 transition-all" style={{width: `${(pkScores.left/(pkScores.left+pkScores.right))*100}%`}} />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-xs font-bold">Mika</span>
                      <span className="text-xs font-bold text-[#ff2e93]">{pkScores.left.toLocaleString()}</span>
                    </div>
                  </div>
                  {pkWinner === 'left' && (
                    <div className="absolute inset-0 bg-[#ff2e93]/20 flex items-center justify-center">
                      <div className="bg-black/80 backdrop-blur px-6 py-3 rounded-2xl border border-[#ff2e93]/50 animate-[giftPop_0.6s_ease]">
                        <div className="text-center">
                          <Crown className="w-8 h-8 text-amber-400 mx-auto mb-1" />
                          <div className="font-bold text-white">WINNER!</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* VS center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-black border-2 border-white/20 flex items-center justify-center font-black text-sm shadow-xl">VS</div>
                  <div className="px-3 py-1 rounded-full bg-black/80 border border-white/10 text-xs font-mono flex items-center gap-1.5">
                    <Timer className="w-3 h-3" /> {Math.floor(pkTimer/60)}:{(pkTimer%60).toString().padStart(2,'0')}
                  </div>
                </div>
                {/* Right host */}
                <div className="flex-1 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=800&fit=crop&crop=face" className="w-full h-full object-cover" alt="host2" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="h-2 bg-black/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all ml-auto" style={{width: `${(pkScores.right/(pkScores.left+pkScores.right))*100}%`}} />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-xs font-bold text-cyan-300">{pkScores.right.toLocaleString()}</span>
                      <span className="text-xs font-bold">Alex</span>
                    </div>
                  </div>
                  {pkWinner === 'right' && (
                    <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                      <div className="bg-black/80 backdrop-blur px-6 py-3 rounded-2xl border border-cyan-400/50 animate-[giftPop_0.6s_ease]">
                        <div className="text-center">
                          <Crown className="w-8 h-8 text-cyan-400 mx-auto mb-1" />
                          <div className="font-bold text-white">WINNER!</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 p-3 md:p-4 flex items-start justify-between z-[5] pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff1744] shadow-[0_0_12px_rgba(255,23,68,0.5)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-[pulseLive_1.2s_ease_infinite]" />
                  <span className="text-[11px] font-bold tracking-wider">LIVE</span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-[11px] font-medium">{(viewerCount/1000).toFixed(1)}k</span>
                </div>
                <div className="hidden md:flex px-2.5 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10">
                  <span className="text-[11px] font-medium text-white/70">HD • 1080P</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                  <Volume2 className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Gift Animation Center */}
            {giftAnim && (
              <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                <div className="relative animate-[giftPop_0.6s_cubic-bezier(0.34,1.56,0.64,1)]">
                  <div className={`absolute -inset-8 bg-gradient-to-br ${giftAnim.gift.color} opacity-30 blur-2xl rounded-full`} />
                  <div className={`w-28 h-28 md:w-36 md:h-36 rounded-[24px] bg-gradient-to-br ${giftAnim.gift.color} flex items-center justify-center shadow-[0_0_40px_rgba(255,46,147,0.5)] border border-white/20 relative`}>
                    <span className="text-5xl md:text-6xl drop-shadow-lg">{giftAnim.gift.emoji}</span>
                    {giftAnim.gift.rare && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow-lg">
                        <Star className="w-3.5 h-3.5 text-black fill-black" />
                      </div>
                    )}
                  </div>
                  {/* combo */}
                  {giftAnim.combo > 1 && (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-black border border-white/20 shadow-xl animate-[giftPop_0.4s_ease_0.2s_both]">
                      <FlameKindling className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-black text-white">x{giftAnim.combo}</span>
                      <span className="text-[10px] text-white/60 font-bold">COMBO!</span>
                    </div>
                  )}
                  {/* floating hearts */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="absolute text-xl" style={{
                        left: `${20 + i*12}%`,
                        bottom: '10%',
                        animation: `floatUp ${1.2 + Math.random()*0.6}s ease-out ${i*0.1}s forwards`,
                      }}>
                        {['💖','✨','💫','🌟'][i%4]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Host Info Card - bottom left */}
            <div className="absolute bottom-[88px] md:bottom-[96px] left-3 md:left-4 right-3 md:right-auto z-[5] pointer-events-none">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] max-w-[340px] pointer-events-auto">
                <div className="relative">
                  <img src="https://i.pravatar.cc/100?img=26" alt="Mika" className="w-11 h-11 rounded-full object-cover ring-2 ring-[#ff2e93]/40" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#ff2e93] to-[#7c3aed] flex items-center justify-center border-2 border-black">
                    <span className="text-[9px] font-bold">L</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[13px] truncate">Mika Live</span>
                    <div className="w-4 h-4 rounded-full bg-[#1d9bf0] flex items-center justify-center shrink-0">
                      <span className="text-[8px]">✓</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-white/50 font-mono">ID: 8839201 • 2.4M fans</div>
                </div>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 h-8 rounded-full text-xs font-bold transition-all shrink-0 ${isFollowing ? 'bg-white/10 text-white/70 border border-white/10' : 'bg-gradient-to-r from-[#ff2e93] to-[#ff6b9d] text-white shadow-[0_0_12px_rgba(255,46,147,0.4)] hover:shadow-[0_0_20px_rgba(255,46,147,0.6)]'}`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>

            {/* Insufficient beans toast */}
            {showInsufficient && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-4 py-2.5 rounded-full bg-black/80 backdrop-blur border border-amber-500/30 text-sm font-medium flex items-center gap-2 animate-[giftPop_0.4s_ease]">
                <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[10px]">!</span>
                Not enough beans
              </div>
            )}

            {/* Gift Bar */}
            <div className={`absolute bottom-0 left-0 right-0 z-[6] transition-all duration-300 ${isGiftPanelOpen ? 'translate-y-0' : 'translate-y-full'}`}>
              <div className="bg-[#111117]/90 backdrop-blur-2xl border-t border-white/[0.06]">
                <div className="flex items-center justify-between px-3 md:px-4 py-2 border-b border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#ff2e93]" />
                    <span className="text-xs font-semibold">Send a gift</span>
                    {combo > 1 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#ff2e93]/20 border border-[#ff2e93]/30 text-[10px] font-bold text-[#ff6b9d]">COMBO x{combo}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-white/40">Balance: {(beans/1000).toFixed(1)}k 🫘</span>
                    <button onClick={() => setIsGiftPanelOpen(false)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 px-3 md:px-4 py-3 overflow-x-auto scroll-hide">
                  {GIFTS.map(g => (
                    <button
                      key={g.id}
                      onClick={() => handleSendGift(g)}
                      className={`group relative shrink-0 w-[72px] md:w-[84px] rounded-2xl border transition-all duration-200 flex flex-col items-center gap-1.5 py-2.5 px-1 ${
                        selectedGift.id === g.id 
                          ? 'bg-white/[0.08] border-[#ff2e93]/50 shadow-[0_0_20px_rgba(255,46,147,0.15)] scale-[1.02]' 
                          : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10'
                      }`}
                    >
                      {g.rare && (
                        <div className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[8px] font-black text-black">RARE</div>
                      )}
                      <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center shadow-lg group-active:scale-95 transition-transform`}>
                        <span className="text-xl md:text-2xl">{g.emoji}</span>
                      </div>
                      <span className="text-[10px] md:text-[11px] font-medium truncate w-full text-center">{g.name}</span>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40 border border-white/10">
                        <span className="text-[9px]">🫘</span>
                        <span className="text-[10px] font-semibold">{g.cost >= 1000 ? `${(g.cost/1000)}k` : g.cost}</span>
                      </div>
                      {selectedGift.id === g.id && combo > 0 && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#ff2e93] text-[10px] font-black">x{combo}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="h-[56px] md:h-[64px] bg-[#111117] border-t border-white/[0.06] flex items-center gap-2 px-3 md:px-4 shrink-0">
            <div className="flex-1 flex items-center gap-2 h-9 md:h-10 px-3 md:px-4 rounded-full bg-white/[0.06] border border-white/[0.08] focus-within:border-[#ff2e93]/40 focus-within:bg-white/[0.08] transition-colors">
              <MessageCircle className="w-4 h-4 text-white/30 shrink-0" />
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                placeholder="Say something..."
                className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-white/30"
              />
              <button
                onClick={handleSendChat}
                disabled={!chatInput.trim()}
                className="text-[#ff2e93] text-xs font-bold disabled:opacity-30 hover:opacity-80 transition"
              >
                Send
              </button>
            </div>

            <button
              onClick={() => setIsGiftPanelOpen(!isGiftPanelOpen)}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all border shrink-0 ${isGiftPanelOpen ? 'bg-[#ff2e93] border-[#ff2e93] shadow-[0_0_12px_rgba(255,46,147,0.4)]' : 'bg-white/[0.06] border-white/10 hover:bg-white/[0.1]'}`}
            >
              <Gift className="w-4 h-4 md:w-[18px] md:h-[18px]" />
            </button>

            <button
              onClick={startPK}
              disabled={pkActive}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all border shrink-0 ${pkActive ? 'bg-white/[0.04] border-white/5 text-white/20' : 'bg-gradient-to-br from-violet-600 to-indigo-600 border-violet-500/30 shadow-[0_0_12px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]'}`}
            >
              <Swords className="w-4 h-4 md:w-[18px] md:h-[18px]" />
            </button>

            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-white/[0.1] transition shrink-0">
              <Mic className="w-4 h-4 md:w-[18px] md:h-[18px] text-white/70" />
            </button>

            <button className="hidden md:flex w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 items-center justify-center hover:bg-white/[0.1] transition shrink-0">
              <MoreHorizontal className="w-[18px] h-[18px] text-white/70" />
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[380px] xl:w-[400px] bg-[#111117] lg:border-l border-white/[0.06] flex flex-col shrink-0 lg:h-auto h-[46vh] lg:min-h-0">
          {isHostMode ? (
            /* HOST DASHBOARD */
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#ff2e93] to-[#7c3aed] flex items-center justify-center">
                      <Crown className="w-3.5 h-3.5" />
                    </div>
                    Host Dashboard
                  </h3>
                  <span className="px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">LIVE • 24:18</span>
                </div>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto scroll-hide flex-1">
                {/* Earnings */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-gradient-to-br from-[#ff2e93]/20 to-[#7c3aed]/20 border border-[#ff2e93]/20 p-3">
                    <div className="text-[11px] text-white/50">Today earnings</div>
                    <div className="text-lg font-bold mt-1">42.3k 🫘</div>
                    <div className="text-[11px] text-emerald-400 mt-1">+12% vs yesterday</div>
                  </div>
                  <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3">
                    <div className="text-[11px] text-white/50">Viewers peak</div>
                    <div className="text-lg font-bold mt-1">{(viewerCount/1000).toFixed(1)}k</div>
                    <div className="text-[11px] text-white/40 mt-1">+342 now</div>
                  </div>
                </div>

                {/* PK Controls */}
                <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold flex items-center gap-1.5"><Swords className="w-3.5 h-3.5 text-violet-400" /> PK Battle</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${pkActive ? 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/40'}`}>{pkActive ? 'ACTIVE' : 'IDLE'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={startPK} disabled={pkActive} className="h-9 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-bold disabled:opacity-40">Start PK</button>
                    <button onClick={() => setPkActive(false)} className="h-9 rounded-xl bg-white/[0.06] border border-white/10 text-xs font-semibold">End PK</button>
                  </div>
                </div>

                {/* Live viewers management */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold">Viewers • {LEADERBOARD.length}</span>
                    <button className="text-[11px] text-white/40 hover:text-white">Manage</button>
                  </div>
                  <div className="space-y-2">
                    {LEADERBOARD.slice(0,4).map(u => (
                      <div key={u.id} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                        <div className="flex items-center gap-2">
                          <img src={u.avatar} className="w-8 h-8 rounded-full" alt={u.name} />
                          <div>
                            <div className="text-xs font-medium">{u.name}</div>
                            <div className="text-[10px] text-white/40">Lv {u.level}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/10"><Volume2 className="w-3.5 h-3.5" /></button>
                          <button className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/10"><Ban className="w-3.5 h-3.5" /></button>
                          <button className="w-7 h-7 rounded-full bg-red-500/15 flex items-center justify-center hover:bg-red-500/20"><UserX className="w-3.5 h-3.5 text-red-400" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gift history */}
                <div>
                  <div className="text-xs font-semibold mb-2">Recent gifts</div>
                  <div className="rounded-xl bg-black/40 border border-white/[0.06] divide-y divide-white/[0.04]">
                    {[
                      { user: 'RichieRich', gift: 'Dragon', value: 9999 },
                      { user: 'QueenBee', gift: 'Castle', value: 4999 },
                      { user: 'AlexVibe', gift: 'Yacht', value: 1999 },
                    ].map((g,i) => (
                      <div key={i} className="flex items-center justify-between p-2.5">
                        <span className="text-xs">{g.user} → {g.gift}</span>
                        <span className="text-[11px] font-mono text-amber-300">+{g.value} 🫘</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex items-center gap-1 p-2 border-b border-white/[0.06] shrink-0">
                {[
                  { id: 'chat', label: 'Chat', icon: MessageCircle, free: false },
                  { id: 'fam', label: 'Fam', icon: Users, free: true },
                  { id: 'rank', label: 'Rank', icon: Trophy, free: false },
                  { id: 'fans', label: 'Fans', icon: Users, free: false },
                ].map((tab: any) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative flex-1 h-8 rounded-full flex items-center justify-center gap-1.5 text-xs font-semibold transition-all border ${activeTab === tab.id ? 'bg-white text-black border-white shadow-sm' : tab.id === 'fam' ? 'bg-gradient-to-r from-[#ff2e93]/15 to-[#7c3aed]/15 border-[#ff2e93]/30 text-[#ff6b9d] hover:from-[#ff2e93]/25 hover:to-[#7c3aed]/25' : 'bg-white/[0.04] border-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.08]'}`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                    {tab.free && !myFamily && (
                      <span className="px-1 py-0.5 rounded-full bg-[#ff2e93] text-[7px] font-black text-white leading-none -mt-0.5">FREE</span>
                    )}
                    {tab.id === 'fam' && myFamily && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse border border-[#111117]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                {/* Fam Badge helper render function */}
                {(() => {
                  const FamTag = ({ family, size = 'sm' }: { family: Family, size?: 'sm' | 'md' }) => {
                    const Icon = family.badge.icon;
                    return (
                      <div className={`inline-flex items-center gap-1 ${size === 'sm' ? 'px-1.5 py-0.5' : 'px-2 py-1'} rounded-full bg-gradient-to-r ${family.badge.bg} border ${family.badge.border} shadow-sm ${family.badge.glow}`}>
                        <Icon className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'} text-white`} />
                        <span className={`${size === 'sm' ? 'text-[9px]' : 'text-[11px]'} font-black text-white tracking-wider leading-none`}>{family.tag}</span>
                      </div>
                    );
                  };
                  // expose via closure for chat
                  (globalThis as any)._FamTagRender = FamTag;
                  return null;
                })()}
                {activeTab === 'chat' && (
                  <div className="flex-1 overflow-y-auto scroll-hide p-3 space-y-2.5">
                    {messages.map(msg => {
                      if (msg.type === 'enter') {
                        return (
                          <div key={msg.id} className="flex items-center gap-2 py-1">
                            <div className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${msg.color} text-[11px] font-bold shadow flex items-center gap-1.5`}>
                              <Sparkles className="w-3 h-3" />
                              Welcome
                            </div>
                            <span className="text-xs">
                              <span className="font-semibold text-amber-300">{msg.user}</span>
                              <span className="text-white/50 ml-1">{msg.text}</span>
                              <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/20 text-[9px] font-bold text-amber-300">Lv {msg.level}</span>
                            </span>
                          </div>
                        );
                      }
                      if (msg.type === 'gift') {
                        return (
                          <div key={msg.id} className="rounded-xl bg-gradient-to-r from-[#ff2e93]/15 to-[#7c3aed]/15 border border-[#ff2e93]/20 px-3 py-2 flex items-center gap-2">
                            <img src={`https://i.pravatar.cc/100?img=${(msg.level%70)+1}`} className="w-6 h-6 rounded-full" alt={msg.user} />
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] leading-tight">
                                {msg.user === 'You' && myFamily && (
                                  <span className="inline-flex mr-1 align-middle">
                                    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r ${myFamily.badge.bg} border ${myFamily.badge.border} text-[8px] font-black text-white tracking-wider`}>
                                      <myFamily.badge.icon className="w-2.5 h-2.5" />
                                      {myFamily.tag}
                                    </span>
                                  </span>
                                )}
                                <span className="font-semibold text-[#ff6b9d]">{msg.user}</span>
                                <span className="text-white/70 ml-1">{msg.text}</span>
                              </div>
                            </div>
                            {msg.gift && (
                              <div className="flex items-center gap-1 shrink-0">
                                <span className="text-lg">{msg.gift.emoji}</span>
                                <Zap className="w-3 h-3 text-amber-400" />
                              </div>
                            )}
                          </div>
                        );
                      }
                      if (msg.type === 'system') {
                        return (
                          <div key={msg.id} className="text-center py-1">
                            <span className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-white/50">{msg.text}</span>
                          </div>
                        );
                      }
                      return (
                        <div key={msg.id} className="flex gap-2">
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold leading-none ${msg.level > 40 ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black' : msg.level > 25 ? 'bg-violet-500/30 border border-violet-500/30 text-violet-200' : 'bg-white/10 text-white/60'}`}>Lv{msg.level}</span>
                            {msg.user === 'You' && myFamily ? (
                              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r ${myFamily.badge.bg} border ${myFamily.badge.border} text-[8px] font-black text-white tracking-wider leading-none`}>
                                <myFamily.badge.icon className="w-2.5 h-2.5" />
                                {myFamily.tag}
                              </span>
                            ) : null}
                            <span className={`text-xs font-medium truncate max-w-[80px] ${msg.user === 'You' ? 'text-[#ff6b9d]' : 'text-white/70'}`}>{msg.user}:</span>
                          </div>
                          <span className="text-xs text-white/90 leading-[18px] break-words">{msg.text}</span>
                        </div>
                      );
                    })}
                    <div ref={chatEndRef} />
                  </div>
                )}

                {activeTab === 'rank' && (
                  <div className="flex-1 overflow-y-auto scroll-hide">
                    <div className="p-3">
                      <div className="rounded-2xl bg-gradient-to-br from-[#ff2e93]/10 via-[#7c3aed]/10 to-[#1e1b4b]/50 border border-white/[0.06] p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold flex items-center gap-1.5"><Trophy className="w-4 h-4 text-amber-400" /> Top Supporters</span>
                          <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 border border-white/10">This Live</span>
                        </div>
                        <div className="flex items-end justify-center gap-4 mt-4 pb-2">
                          {/* 2nd */}
                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <img src={LEADERBOARD[1].avatar} className="w-12 h-12 rounded-full ring-2 ring-white/20" alt="2nd" />
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 flex items-center justify-center text-[10px] font-black">2</div>
                            </div>
                            <div className="text-[11px] font-semibold mt-2 truncate max-w-[60px]">{LEADERBOARD[1].name}</div>
                            <div className="text-[10px] text-amber-300 font-mono">{(LEADERBOARD[1].beans/1000).toFixed(1)}k</div>
                          </div>
                          {/* 1st */}
                          <div className="flex flex-col items-center">
                            <Crown className="w-5 h-5 text-amber-400 mb-1 animate-bounce" />
                            <div className="relative">
                              <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-sm opacity-60" />
                              <img src={LEADERBOARD[0].avatar} className="relative w-16 h-16 rounded-full ring-2 ring-amber-400/50" alt="1st" />
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center text-[11px] font-black text-black">1</div>
                            </div>
                            <div className="text-xs font-bold mt-2">{LEADERBOARD[0].name}</div>
                            <div className="text-[11px] text-amber-300 font-mono font-bold">{(LEADERBOARD[0].beans/1000).toFixed(1)}k 🫘</div>
                          </div>
                          {/* 3rd */}
                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <img src={LEADERBOARD[2].avatar} className="w-12 h-12 rounded-full ring-2 ring-white/20" alt="3rd" />
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-amber-600 to-orange-800 flex items-center justify-center text-[10px] font-black">3</div>
                            </div>
                            <div className="text-[11px] font-semibold mt-2 truncate max-w-[60px]">{LEADERBOARD[2].name}</div>
                            <div className="text-[10px] text-amber-300 font-mono">{(LEADERBOARD[2].beans/1000).toFixed(1)}k</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {LEADERBOARD.map((g, idx) => (
                          <div key={g.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition">
                            <span className="w-5 text-center text-xs font-bold text-white/30">{idx+1}</span>
                            <img src={g.avatar} className="w-9 h-9 rounded-full" alt={g.name} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold truncate">{g.name}</span>
                                <span className="px-1 py-0.5 rounded bg-white/10 text-[8px] font-bold">Lv{g.level}</span>
                              </div>
                              <div className="text-[11px] text-white/40">{g.gifts} gifts</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-bold text-amber-300">{g.beans.toLocaleString()} 🫘</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'fans' && (
                  <div className="flex-1 overflow-y-auto scroll-hide p-3">
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({length: 12}).map((_, i) => (
                        <div key={i} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-2.5 flex flex-col items-center gap-1.5">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-full" alt="fan" />
                          <span className="text-[11px] font-medium truncate w-full text-center">{MOCK_USERS[i % MOCK_USERS.length]}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10">Lv {15+i*3}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'fam' && (
                  <div className="flex-1 overflow-y-auto scroll-hide flex flex-col">
                    {/* My Fam Card if exists */}
                    {myFamily ? (
                      <div className="m-3 p-3.5 rounded-[20px] bg-gradient-to-br from-[#ff2e93]/20 via-[#7c3aed]/20 to-[#1e1b4b]/80 border border-[#ff2e93]/30 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#ff2e93]/20 to-[#7c3aed]/20 blur-2xl" />
                        <div className="relative flex items-start justify-between">
                          <div className="flex gap-3">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${myFamily.badge.bg} border ${myFamily.badge.border} flex items-center justify-center shadow-lg ${myFamily.badge.glow}`}>
                              <myFamily.badge.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm">{myFamily.name}</span>
                                <span className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${myFamily.badge.bg} text-[10px] font-black tracking-wider`}>[{myFamily.tag}]</span>
                              </div>
                              <div className="text-[11px] text-white/50 mt-1">Owner • You • Lv {myFamily.level} • {myFamily.members} member{myFamily.members>1?'s':''}</div>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 flex items-center gap-1"><BadgeCheck className="w-3 h-3" /> VERIFIED FOUNDER</span>
                                <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold">FREE 🆓</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="rounded-xl bg-black/30 border border-white/5 p-2 text-center">
                            <div className="text-[10px] text-white/40">Members</div>
                            <div className="text-sm font-bold">{myFamily.members}</div>
                          </div>
                          <div className="rounded-xl bg-black/30 border border-white/5 p-2 text-center">
                            <div className="text-[10px] text-white/40">Level</div>
                            <div className="text-sm font-bold">{myFamily.level}</div>
                          </div>
                          <div className="rounded-xl bg-black/30 border border-white/5 p-2 text-center">
                            <div className="text-[10px] text-white/40">Beans</div>
                            <div className="text-sm font-bold">0 🫘</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="m-3 p-4 rounded-[20px] bg-gradient-to-br from-[#ff2e93]/15 to-[#7c3aed]/15 border border-[#ff2e93]/20 border-dashed relative overflow-hidden">
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff2e93] to-[#7c3aed] flex items-center justify-center shadow-[0_0_20px_rgba(255,46,147,0.3)]">
                            <Users className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-sm">Create Your Family — FREE</div>
                            <div className="text-[11px] text-white/60 mt-1 leading-relaxed">BIGO normally charges 1000💎, but for early founders it's <span className="text-white font-bold">0 🆓 FREE</span>. Get premium badge + tag in chat.</div>
                          </div>
                        </div>
                        <button onClick={() => setShowFamModal(true)} className="mt-3 w-full h-10 rounded-full bg-gradient-to-r from-[#ff2e93] to-[#7c3aed] font-bold text-sm shadow-[0_0_20px_rgba(255,46,147,0.3)] hover:shadow-[0_0_30px_rgba(255,46,147,0.5)] transition-all">Create Fam - FREE 🆓</button>
                      </div>
                    )}

                    {/* Search */}
                    <div className="px-3 pb-2">
                      <div className="h-9 px-3 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center gap-2">
                        <Shield className="w-4 h-4 text-white/30" />
                        <input value={famSearch} onChange={e=>setFamSearch(e.target.value)} placeholder="Search families..." className="flex-1 bg-transparent outline-none text-xs placeholder:text-white/30" />
                      </div>
                    </div>

                    {/* Families list */}
                    <div className="px-3 pb-3 space-y-2">
                      <div className="flex items-center justify-between py-1">
                        <span className="text-[11px] font-bold text-white/50 tracking-wider">TOP FAMILIES • {filteredFamilies.length}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10">FREE CREATION ON</span>
                      </div>
                      {filteredFamilies.map(fam => {
                        const Icon = fam.badge.icon;
                        const isMine = myFamily?.id === fam.id;
                        return (
                          <div key={fam.id} className={`group p-3 rounded-2xl border transition-all ${isMine ? 'bg-gradient-to-r from-[#ff2e93]/10 to-[#7c3aed]/10 border-[#ff2e93]/30' : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/10'}`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${fam.badge.bg} border ${fam.badge.border} flex items-center justify-center shadow-lg ${fam.badge.glow} group-hover:scale-105 transition-transform`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[13px] font-bold truncate">{fam.name}</span>
                                  <span className={`px-1.5 py-0.5 rounded-full bg-gradient-to-r ${fam.badge.bg} text-[9px] font-black tracking-wider`}>{fam.tag}</span>
                                  {isMine && <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />}
                                </div>
                                <div className="text-[11px] text-white/40 mt-0.5 flex items-center gap-2">
                                  <span>{fam.owner} • Lv {fam.level}</span>
                                  <span className="w-1 h-1 rounded-full bg-white/20" />
                                  <span>{fam.members} members</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition">
                                  <Hexagon className="w-3.5 h-3.5 text-white/60" />
                                </div>
                              </div>
                            </div>
                            {isMine && (
                              <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-2 text-[10px]">
                                <span className="px-2 py-1 rounded-full bg-[#ff2e93]/20 border border-[#ff2e93]/30 text-[#ff6b9d] font-bold">YOUR FAM</span>
                                <span className="text-white/30">Badge shown as [{fam.tag}] You in chat</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 mt-auto">
                      <div className="rounded-xl bg-[#ff2e93]/10 border border-[#ff2e93]/20 p-2.5 flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff2e93] to-[#7c3aed] flex items-center justify-center shrink-0">
                          <Wand2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold">Founder Perk: FREE BADGE FOREVER</div>
                          <div className="text-[10px] text-white/50 mt-0.5 leading-relaxed">Usually 1000💎 in BIGO. Now FREE. Premium badge, tag in chat, family level, no beans deducted. Limited to early users.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom fan count bar */}
              <div className="h-12 px-3 border-t border-white/[0.06] flex items-center justify-between shrink-0 bg-[#0f0f14]">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {LEADERBOARD.slice(0,3).map(u => (
                      <img key={u.id} src={u.avatar} className="w-6 h-6 rounded-full ring-2 ring-[#111117]" alt={u.name} />
                    ))}
                  </div>
                  <span className="text-[11px] text-white/50">+2.4M fans • 18.2k likes</span>
                </div>
                <div className="flex items-center gap-2">
                  {myFamily && (
                    <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${myFamily.badge.bg} border ${myFamily.badge.border} flex items-center gap-1`}>
                      <myFamily.badge.icon className="w-3 h-3" />
                      <span className="text-[10px] font-black tracking-wider">{myFamily.tag}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-[#ff2e93] fill-[#ff2e93] animate-pulse" />
                    <span className="text-xs font-bold">18.2k</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile gift handle */}
      {!isGiftPanelOpen && (
        <button
          onClick={() => setIsGiftPanelOpen(true)}
          className="lg:hidden fixed bottom-[76px] right-3 w-12 h-12 rounded-full bg-gradient-to-br from-[#ff2e93] to-[#7c3aed] shadow-[0_0_20px_rgba(255,46,147,0.4)] flex items-center justify-center z-20 border border-white/20"
        >
          <Gift className="w-6 h-6" />
        </button>
      )}

      {/* FAM CREATION MODAL */}
      {showFamModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4 bg-black/70 backdrop-blur-xl">
          <div className="w-full max-w-[420px] rounded-[24px] bg-[#15151d] border border-white/[0.08] shadow-[0_20px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,46,147,0.15)] overflow-hidden animate-[famEntrance_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
            {/* Header */}
            <div className="relative p-5 pb-4 bg-gradient-to-br from-[#ff2e93]/15 via-[#7c3aed]/15 to-transparent border-b border-white/[0.06]">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-[#ff2e93]/20 to-[#7c3aed]/20 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#7c3aed]/15 blur-2xl" />
              <div className="relative flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff2e93] to-[#7c3aed] flex items-center justify-center shadow-[0_0_20px_rgba(255,46,147,0.4)] animate-[famGlow_2s_ease_infinite]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-[18px] leading-none">Create Family</h2>
                      <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-black text-[#ff2e93]">FREE</span>
                    </div>
                    <p className="text-[12px] text-white/50 mt-1.5 leading-relaxed max-w-[220px]">BIGO charges 1000💎 normally. <span className="text-white font-semibold">Early founders get it FREE</span> — premium badge + tag in chat.</p>
                  </div>
                </div>
                <button onClick={() => setShowFamModal(false)} className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center hover:bg-white/15 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* Cost banner */}
              <div className="mt-4 flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <span className="text-[14px]">🆓</span>
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-300/70 font-medium">Normal price: <span className="line-through">1000💎</span></div>
                    <div className="text-xs font-bold text-emerald-300">Cost: FREE 🆓 — No beans deducted</div>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-emerald-500 text-[10px] font-black text-black">0💎</div>
              </div>
            </div>

            {/* Form */}
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-white/60 tracking-wider">FAMILY NAME</label>
                <div className="relative">
                  <input
                    value={famName}
                    onChange={e => setFamName(e.target.value)}
                    placeholder="e.g. Jodel Elite Squad"
                    maxLength={20}
                    className="w-full h-11 px-4 pr-12 rounded-xl bg-white/[0.06] border border-white/[0.08] outline-none text-sm placeholder:text-white/30 focus:border-[#ff2e93]/40 focus:bg-white/[0.08] transition"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/30 font-mono">{famName.length}/20</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-white/60 tracking-wider">FAMILY TAG (2-4 LETTERS) — Shows in chat as [TAG]</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">[ ]</div>
                  <input
                    value={famTag}
                    onChange={e => setFamTag(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,4))}
                    placeholder="JODEL"
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.06] border border-white/[0.08] outline-none text-sm font-bold tracking-widest placeholder:text-white/30 placeholder:tracking-normal placeholder:font-normal focus:border-[#ff2e93]/40 focus:bg-white/[0.08] transition uppercase"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className={famTag.length >=2 && famTag.length <=4 ? 'text-emerald-400' : 'text-white/30'}>• 2-4 characters</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-white/40">Example: [JODEL] You: hello!</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white/60 tracking-wider flex items-center gap-2">
                  CHOOSE BADGE STYLE <span className="px-1.5 py-0.5 rounded-full bg-[#ff2e93]/20 border border-[#ff2e93]/30 text-[9px] text-[#ff6b9d]">6 PREMIUM DESIGNS — FREE</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {FAM_BADGES.map(badge => {
                    const Icon = badge.icon;
                    const isSelected = selectedBadge.id === badge.id;
                    return (
                      <button
                        key={badge.id}
                        onClick={() => setSelectedBadge(badge)}
                        className={`relative group p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all ${isSelected ? 'bg-white/[0.08] border-[#ff2e93]/60 shadow-[0_0_20px_rgba(255,46,147,0.2)] scale-[1.02]' : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10'}`}
                      >
                        {isSelected && <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#ff2e93] border-2 border-[#15151d] flex items-center justify-center"><BadgeCheck className="w-3 h-3 text-white" /></div>}
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${badge.bg} border ${badge.border} flex items-center justify-center shadow-lg ${badge.glow} group-active:scale-95 transition-transform`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] font-semibold leading-tight text-center">{badge.name}</span>
                        {isSelected && famTag && (
                          <span className={`px-1.5 py-0.5 rounded-full bg-gradient-to-r ${badge.bg} text-[8px] font-black tracking-wider`}>{famTag || 'TAG'}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preview */}
              {famName && famTag && (
                <div className="p-3 rounded-xl bg-black/30 border border-white/5 animate-[famEntrance_0.3s_ease]">
                  <div className="text-[10px] font-bold text-white/40 tracking-wider mb-2">PREVIEW — How it looks in chat</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${selectedBadge.bg} border ${selectedBadge.border} text-[9px] font-black tracking-wider`}>
                      <selectedBadge.icon className="w-3 h-3" />
                      {famTag}
                    </span>
                    <span className="font-medium text-[#ff6b9d]">You:</span>
                    <span className="text-white/80">Hello fam! {famName} rocks 🚀</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 pt-0 flex gap-2">
              <button onClick={() => setShowFamModal(false)} className="flex-1 h-11 rounded-full bg-white/[0.06] border border-white/10 text-sm font-semibold hover:bg-white/[0.1] transition">Cancel</button>
              <button
                onClick={handleCreateFam}
                disabled={!famName.trim() || famTag.length < 2}
                className="flex-[1.6] h-11 rounded-full bg-gradient-to-r from-[#ff2e93] to-[#7c3aed] font-bold text-sm shadow-[0_0_20px_rgba(255,46,147,0.4)] hover:shadow-[0_0_30px_rgba(255,46,147,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-40 disabled:shadow-none disabled:scale-100 flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4" />
                Create Fam - FREE 🆓
              </button>
            </div>
            <div className="px-5 pb-4 flex items-center justify-center gap-1.5 text-[10px] text-white/30">
              <Shield className="w-3 h-3" />
              <span>Free for early founders • No diamonds needed • Badge lasts forever</span>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {famToast && (
        <div className="fixed bottom-[88px] left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-[420px] animate-[famEntrance_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
          <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#ff2e93] to-[#7c3aed] border border-white/20 shadow-[0_10px_40px_rgba(255,46,147,0.4)] flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <BadgeCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold leading-tight">{famToast}</div>
              <div className="text-[11px] text-white/80 mt-0.5">Your badge now shows as [{myFamily?.tag}] in chat</div>
            </div>
            <button onClick={() => setFamToast(null)} className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 hover:bg-white/20">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

