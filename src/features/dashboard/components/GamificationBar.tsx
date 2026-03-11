import { motion } from 'motion/react';
import { Trophy, Zap, Star } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';

interface GamificationBarProps {
  points: number;
  level: number;
}

export function GamificationBar({ points, level }: GamificationBarProps) {
  const pointsToNextLevel = (level * 100) - points;
  const levelProgress = ((points % 100) / 100) * 100;

  return (
    <div className="flex items-center gap-3">
      {/* Ribbon-style Points Display */}
      <div className="relative">
        {/* Ribbon background */}
        <div className="relative px-4 py-1.5 bg-gradient-to-r from-[#C8A452] via-[#E0C075] to-[#C8A452] shadow-lg"
          style={{
            clipPath: 'polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)'
          }}
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#1A1A1A]" />
            <span className="text-[#1A1A1A] font-semibold" style={{ fontFamily: 'serif' }}>{points}</span>
          </div>
        </div>
        {/* Ribbon shadow/depth */}
        <div className="absolute inset-0 -z-10 translate-y-0.5 bg-gradient-to-b from-[#9C7E3D] to-[#7A6230] opacity-50"
          style={{
            clipPath: 'polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)'
          }}
        ></div>
      </div>

      {/* Level Badge with Emblem */}
      <div className="relative">
        <div className="px-3 py-1 bg-gradient-to-br from-[#8B1538] to-[#5C0F26] border-2 border-[#C8A452] rounded-md shadow-lg">
          <div className="flex items-center gap-2">
            <Trophy className="w-3 h-3 text-[#C8A452]" />
            <span className="text-[#F5ECD7] text-sm" style={{ fontFamily: 'serif' }}>Cấp {level}</span>
          </div>
        </div>
        {/* Decorative corner accents */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-[#C8A452]"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 border-[#C8A452]"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2 border-[#C8A452]"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 border-[#C8A452]"></div>
      </div>
      
      {/* Progress to next level */}
      <div className="flex items-center gap-2">
        <div className="w-24 h-2.5 bg-[#1A1A1A] rounded-full overflow-hidden border border-[#C8A452]/30 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8B1538] via-[#A41E3F] to-[#C8A452] shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${levelProgress}%` }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3), 0 0 8px rgba(200, 164, 82, 0.4)'
            }}
          />
        </div>
        <span className="text-[#C8A452] text-xs whitespace-nowrap" style={{ fontFamily: 'serif' }}>
          {pointsToNextLevel > 0 ? `-${pointsToNextLevel}` : 'Max'}
        </span>
      </div>

      {/* Streak indicator with flame */}
      <div className="relative px-2 py-1 bg-gradient-to-br from-[#8B1538]/30 to-[#5C0F26]/30 border border-[#8B1538]/50 rounded-md">
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-[#C8A452]" fill="#C8A452" />
          <span className="text-[#C8A452] text-sm" style={{ fontFamily: 'serif' }}>7</span>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-md opacity-50"
          style={{
            boxShadow: '0 0 10px rgba(139, 21, 56, 0.5)'
          }}
        ></div>
      </div>
    </div>
  );
}
