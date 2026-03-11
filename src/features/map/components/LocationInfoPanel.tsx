import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { HistoricalEvent } from '../types/history.types';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { MapPin, Calendar, User, TrendingUp, Map, ChevronRight, Lock, Unlock } from 'lucide-react';

interface LocationInfoPanelProps {
  event: HistoricalEvent;
}

export function LocationInfoPanel({ event }: LocationInfoPanelProps) {
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [activeTab, setActiveTab] = useState('level1');

  useEffect(() => {
    setUnlockedLevel(1);
    setActiveTab('level1');
  }, [event.id]);

  const unlockNextLevel = () => {
    if (unlockedLevel < 3) {
      setUnlockedLevel(prev => prev + 1);
    }
  };

  const cultureContent = event.cultureContent
    ?? (event.cultureFieldKey && event.cultureData ? event.cultureData[event.cultureFieldKey] : undefined);

  // Single-section rendering for culture markers
  if (cultureContent) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-white mb-2">{event.name}</h2>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">
              <MapPin className="w-3 h-3 mr-1" />
              {event.locationLabel || event.location || event.basicInfo.location}
            </Badge>
            <Badge variant="secondary">
              {event.period}
            </Badge>
            <Badge variant="secondary">Văn Lang - Âu Lạc</Badge>
          </div>
        </div>

        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm mb-2">Nội dung</p>
          <p className="text-white text-sm leading-relaxed">{cultureContent}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-white mb-2">{event.name}</h2>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">
            <Calendar className="w-3 h-3 mr-1" />
            {event.year}
          </Badge>
          <Badge variant="secondary">
            {event.period}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="level1" className="text-xs">
            <div className="flex items-center gap-1">
              Cấp 1
              <Unlock className="w-3 h-3" />
            </div>
          </TabsTrigger>
          <TabsTrigger value="level2" disabled={unlockedLevel < 2} className="text-xs">
            <div className="flex items-center gap-1">
              Cấp 2
              {unlockedLevel >= 2 ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            </div>
          </TabsTrigger>
          <TabsTrigger value="level3" disabled={unlockedLevel < 3} className="text-xs">
            <div className="flex items-center gap-1">
              Cấp 3
              {unlockedLevel >= 3 ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="level1" className="space-y-3 mt-4">
          <Card className="p-4 bg-slate-800 border-slate-700">
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-400 mt-1" />
              <div>
                <p className="text-slate-400 text-sm">Địa điểm</p>
                <p className="text-white">{event.basicInfo.location}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-slate-800 border-slate-700">
            <div className="flex items-start gap-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-400 mt-1" />
              <div>
                <p className="text-slate-400 text-sm">Thời gian</p>
                <p className="text-white">{event.basicInfo.time}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-slate-800 border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Sự kiện chính</p>
            <p className="text-white">{event.basicInfo.mainEvent}</p>
          </Card>

          {unlockedLevel === 1 && (
            <Button onClick={unlockNextLevel} className="w-full">
              Mở khóa Cấp 2
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </TabsContent>

        <TabsContent value="level2" className="space-y-3 mt-4">
          <Card className="p-4 bg-slate-800 border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Nguyên nhân</p>
            <p className="text-white">{event.detailedInfo.cause}</p>
          </Card>

          <Card className="p-4 bg-slate-800 border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Diễn biến</p>
            <p className="text-white">{event.detailedInfo.development}</p>
          </Card>

          <Card className="p-4 bg-slate-800 border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Kết quả</p>
            <p className="text-white">{event.detailedInfo.result}</p>
          </Card>

          <Card className="p-4 bg-slate-800 border-slate-700">
            <div className="flex items-start gap-2 mb-2">
              <User className="w-4 h-4 text-blue-400 mt-1" />
              <div className="flex-1">
                <p className="text-slate-400 text-sm mb-2">Nhân vật chính</p>
                <div className="flex flex-wrap gap-2">
                  {event.detailedInfo.characters.map((character, index) => (
                    <Badge key={index} variant="secondary">
                      {character}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {unlockedLevel === 2 && (
            <Button onClick={unlockNextLevel} className="w-full">
              Mở khóa Cấp 3
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </TabsContent>

        <TabsContent value="level3" className="space-y-3 mt-4">
          <Card className="p-4 bg-slate-800 border-slate-700">
            <div className="flex items-start gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-400 mt-1" />
              <div>
                <p className="text-slate-400 text-sm mb-2">Thay đổi lãnh thổ</p>
                <p className="text-white">{event.advancedInfo.territoryChanges}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-slate-800 border-slate-700">
            <div className="flex items-start gap-2 mb-2">
              <Map className="w-4 h-4 text-blue-400 mt-1" />
              <div>
                <p className="text-slate-400 text-sm mb-2">Bản đồ chiến dịch</p>
                <p className="text-white">{event.advancedInfo.campaignMap}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-slate-800 border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Đường hành quân</p>
            <div className="space-y-2">
              {event.advancedInfo.marchRoutes.map((route, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <p className="text-white text-sm">{route}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Interactive Campaign Map Visualization */}
          <Card className="p-4 bg-slate-800 border-slate-700">
            <p className="text-slate-400 text-sm mb-3">Bản đồ chiến dịch tương tác</p>
            <div className="relative h-48 bg-slate-900 rounded border border-slate-700">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Simple route visualization */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 5 3, 0 6" fill="#60a5fa" />
                  </marker>
                </defs>
                
                <motion.path
                  d="M 20 80 L 40 60 L 60 40 L 80 20"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {[
                  { x: 20, y: 80, label: 'Bắt đầu' },
                  { x: 40, y: 60, label: 'Điểm 1' },
                  { x: 60, y: 40, label: 'Điểm 2' },
                  { x: 80, y: 20, label: 'Kết thúc' }
                ].map((point, index) => (
                  <g key={index}>
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r="3"
                      fill="#60a5fa"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.5, duration: 0.3 }}
                    />
                    <text
                      x={point.x}
                      y={point.y - 5}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="4"
                    >
                      {point.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Briefing Button */}
      <Card className="p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-700/50">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-white mb-1">Quick Briefing AI</p>
            <p className="text-slate-300 text-sm">Tóm tắt sự kiện trong 30-60 giây</p>
          </div>
          <Button variant="secondary" size="sm">
            Xem ngay
          </Button>
        </div>
      </Card>
    </div>
  );
}
