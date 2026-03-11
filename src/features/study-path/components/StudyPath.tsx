import { useState } from 'react';
import { motion } from 'motion/react';
import type { HistoricalEvent } from '@/features/map/types/history.types';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Route, Target, TrendingUp, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface StudyPathProps {
  unlockedEvents: string[];
  currentEvent: HistoricalEvent | null;
}

interface StudyRecommendation {
  eventId: string;
  eventName: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

export function StudyPath({ unlockedEvents, currentEvent }: StudyPathProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock AI-generated study path
  const recommendations: StudyRecommendation[] = [
    {
      eventId: 'event2',
      eventName: 'Ngô Quyền đánh Bạch Đằng',
      reason: 'Sự kiện này liên quan trực tiếp đến thời kỳ tự chủ',
      priority: 'high',
      estimatedTime: '15 phút'
    },
    {
      eventId: 'event3',
      eventName: 'Lý Thái Tổ dời đô',
      reason: 'Tiếp theo thứ tự thời gian, quan trọng để hiểu phát triển nhà nước',
      priority: 'high',
      estimatedTime: '10 phút'
    },
    {
      eventId: 'event4',
      eventName: 'Trần Hưng Đạo đánh Mông Cổ',
      reason: 'Chiến công vĩ đại, có liên hệ với chiến lược quân sự',
      priority: 'medium',
      estimatedTime: '20 phút'
    },
    {
      eventId: 'event5',
      eventName: 'Lê Lợi khởi nghĩa',
      reason: 'Mốc quan trọng trong lịch sử chống ngoại xâm',
      priority: 'medium',
      estimatedTime: '20 phút'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30';
      case 'low': return 'text-green-400 bg-green-900/30';
      default: return 'text-slate-400 bg-slate-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Ưu tiên cao';
      case 'medium': return 'Ưu tiên trung bình';
      case 'low': return 'Tùy chọn';
      default: return priority;
    }
  };

  return (
    <div className="w-full">
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Route className="w-4 h-4" />
          <span>Lộ trình học AI</span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 space-y-3"
        >
          {/* Progress Summary */}
          <Card className="p-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-blue-400" />
              <p className="text-white text-sm">Tiến độ học tập</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300 text-sm">{unlockedEvents.length} / 8 sự kiện</span>
              <span className="text-blue-400 text-sm">{Math.round((unlockedEvents.length / 8) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedEvents.length / 8) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </Card>

          {/* Study Recommendations */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <p className="text-slate-300 text-sm">Gợi ý học tiếp</p>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {recommendations.map((rec, index) => {
                const isUnlocked = unlockedEvents.includes(rec.eventId);
                
                return (
                  <motion.div
                    key={rec.eventId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`p-3 ${isUnlocked ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-800 border-slate-700'}`}>
                      <div className="flex items-start gap-2 mb-2">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-700 flex items-center justify-center text-xs text-blue-400">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm mb-1 ${isUnlocked ? 'text-slate-500 line-through' : 'text-white'}`}>
                            {rec.eventName}
                          </p>
                          <p className="text-slate-400 text-xs mb-2">{rec.reason}</p>
                          
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className={`text-xs ${getPriorityColor(rec.priority)}`}>
                              {getPriorityLabel(rec.priority)}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <BookOpen className="w-3 h-3 mr-1" />
                              {rec.estimatedTime}
                            </Badge>
                            {isUnlocked && (
                              <Badge variant="secondary" className="text-xs text-green-400 bg-green-900/30">
                                ✓ Đã hoàn thành
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* External Resources */}
          <Card className="p-3 bg-slate-800 border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <p className="text-slate-300 text-sm">Tài liệu mở rộng</p>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left p-2 bg-slate-900 hover:bg-slate-700 rounded text-xs text-slate-300 transition-colors">
                📺 Video: Lịch sử Việt Nam thời Bắc thuộc
              </button>
              <button className="w-full text-left p-2 bg-slate-900 hover:bg-slate-700 rounded text-xs text-slate-300 transition-colors">
                📄 Bài viết: Chiến lược chống Mông Cổ
              </button>
              <button className="w-full text-left p-2 bg-slate-900 hover:bg-slate-700 rounded text-xs text-slate-300 transition-colors">
                🎧 Podcast: Những anh hùng dân tộc
              </button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
