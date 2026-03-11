import { motion } from 'motion/react';
import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { 
  Trophy, Target, TrendingUp, Clock, Award, 
  BookOpen, MapPin, MessageSquare, Network, Zap 
} from 'lucide-react';

interface DashboardProps {
  userPoints: number;
  unlockedEvents: string[];
}

interface ActivityLog {
  id: string;
  type: 'unlock' | 'quiz' | 'chat' | 'connection';
  description: string;
  timestamp: Date;
  points: number;
}

interface WeakArea {
  topic: string;
  accuracy: number;
  questionsAttempted: number;
}

export function Dashboard({ userPoints, unlockedEvents }: DashboardProps) {
  // Mock data
  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      type: 'unlock',
      description: 'Mở khóa sự kiện "Khởi nghĩa Hai Bà Trưng"',
      timestamp: new Date(Date.now() - 3600000),
      points: 10
    },
    {
      id: '2',
      type: 'quiz',
      description: 'Hoàn thành quiz với 80 điểm',
      timestamp: new Date(Date.now() - 7200000),
      points: 80
    },
    {
      id: '3',
      type: 'chat',
      description: 'Trò chuyện với NPC "Người dân Mê Linh"',
      timestamp: new Date(Date.now() - 10800000),
      points: 5
    },
    {
      id: '4',
      type: 'connection',
      description: 'Phân tích kết nối giữa 2 sự kiện',
      timestamp: new Date(Date.now() - 14400000),
      points: 15
    }
  ];

  const weakAreas: WeakArea[] = [
    { topic: 'Thời kỳ Bắc thuộc', accuracy: 60, questionsAttempted: 5 },
    { topic: 'Nhà Trần', accuracy: 75, questionsAttempted: 4 },
    { topic: 'Chiến tranh chống Pháp', accuracy: 50, questionsAttempted: 2 }
  ];

  const studyTime = {
    today: 45,
    thisWeek: 180,
    total: 1250
  };

  const achievements = [
    { id: 1, name: 'Người khám phá', description: 'Mở khóa 5 sự kiện', unlocked: true, icon: '🗺️' },
    { id: 2, name: 'Học giả', description: 'Đạt 100 điểm', unlocked: true, icon: '📚' },
    { id: 3, name: 'Thạc sĩ lịch sử', description: 'Hoàn thành 10 quiz', unlocked: false, icon: '🎓' },
    { id: 4, name: 'Nhà khảo cổ', description: 'Phân tích 20 kết nối sự kiện', unlocked: false, icon: '🔍' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'unlock': return <MapPin className="w-4 h-4" />;
      case 'quiz': return <BookOpen className="w-4 h-4" />;
      case 'chat': return <MessageSquare className="w-4 h-4" />;
      case 'connection': return <Network className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'unlock': return 'text-blue-400 bg-blue-900/30';
      case 'quiz': return 'text-purple-400 bg-purple-900/30';
      case 'chat': return 'text-green-400 bg-green-900/30';
      case 'connection': return 'text-yellow-400 bg-yellow-900/30';
      default: return 'text-slate-400 bg-slate-800';
    }
  };

  const level = Math.floor(userPoints / 100) + 1;
  const pointsToNextLevel = (level * 100) - userPoints;
  const levelProgress = ((userPoints % 100) / 100) * 100;

  return (
    <div className="h-full overflow-y-auto bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-300 text-sm">Tổng điểm</p>
                <p className="text-white text-2xl">{userPoints}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-300 text-sm">Cấp độ</p>
                <p className="text-white text-2xl">Level {level}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-300 text-sm">Sự kiện đã mở</p>
                <p className="text-white text-2xl">{unlockedEvents.length}/8</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-700 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-300 text-sm">Thời gian học</p>
                <p className="text-white text-2xl">{studyTime.today}p</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="p-6 bg-slate-900 border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-white mb-1">Tiến độ cấp độ</h3>
              <p className="text-slate-400 text-sm">
                Còn {pointsToNextLevel} điểm để lên cấp {level + 1}
              </p>
            </div>
            <Award className="w-8 h-8 text-yellow-500" />
          </div>
          <Progress value={levelProgress} className="h-3" />
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity Timeline */}
            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h3 className="text-white">Hoạt động gần đây</h3>
              </div>
              
              <div className="space-y-3">
                {activityLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(log.type)}`}>
                      {getActivityIcon(log.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm">{log.description}</p>
                      <p className="text-slate-500 text-xs mt-1">
                        {log.timestamp.toLocaleString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit'
                        })}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-green-400 bg-green-900/30">
                      +{log.points}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Weak Areas */}
            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-red-400" />
                <h3 className="text-white">Chủ đề cần cải thiện</h3>
              </div>
              
              <div className="space-y-4">
                {weakAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-white text-sm">{area.topic}</p>
                        <p className="text-slate-500 text-xs">
                          {area.questionsAttempted} câu hỏi đã làm
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={
                          area.accuracy >= 80 ? 'text-green-400 bg-green-900/30' :
                          area.accuracy >= 60 ? 'text-yellow-400 bg-yellow-900/30' :
                          'text-red-400 bg-red-900/30'
                        }
                      >
                        {area.accuracy}%
                      </Badge>
                    </div>
                    <Progress value={area.accuracy} />
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Study Time Chart */}
            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-purple-400" />
                <h3 className="text-white">Thời gian học tập</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-800 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Hôm nay</p>
                  <p className="text-white text-2xl">{studyTime.today}</p>
                  <p className="text-slate-500 text-xs">phút</p>
                </div>
                <div className="text-center p-4 bg-slate-800 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Tuần này</p>
                  <p className="text-white text-2xl">{studyTime.thisWeek}</p>
                  <p className="text-slate-500 text-xs">phút</p>
                </div>
                <div className="text-center p-4 bg-slate-800 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Tổng cộng</p>
                  <p className="text-white text-2xl">{studyTime.total}</p>
                  <p className="text-slate-500 text-xs">phút</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-yellow-500" />
                <h3 className="text-white">Thành tích</h3>
              </div>

              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg border-2 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-700/50'
                        : 'bg-slate-800 border-slate-700 opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className="text-white text-sm mb-1">{achievement.name}</p>
                        <p className="text-slate-400 text-xs">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <Trophy className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Learning Streak */}
            <Card className="p-6 bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700/50">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-orange-400" />
                <h3 className="text-white">Chuỗi học tập</h3>
              </div>
              <div className="text-center">
                <p className="text-5xl mb-2">🔥</p>
                <p className="text-white text-3xl mb-1">7 ngày</p>
                <p className="text-slate-400 text-sm">Tiếp tục phấn đấu!</p>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="text-white mb-4">Thống kê nhanh</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Quiz hoàn thành</span>
                  <span className="text-white">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Độ chính xác trung bình</span>
                  <span className="text-green-400">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Kết nối đã phân tích</span>
                  <span className="text-white">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Cuộc hội thoại NPC</span>
                  <span className="text-white">8</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
