import { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Network, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

interface Connection {
  type: 'cause' | 'effect' | 'parallel' | 'inspiration';
  description: string;
  strength: number;
}

interface EventOption {
  id: string;
  name: string;
  year: number;
}

const eventOptions: EventOption[] = [
  { id: 'event1', name: 'Khởi nghĩa Hai Bà Trưng', year: 40 },
  { id: 'event2', name: 'Ngô Quyền đánh Bạch Đằng', year: 938 },
  { id: 'event4', name: 'Trần Hưng Đạo đánh Mông Cổ', year: 1288 },
  { id: 'event5', name: 'Lê Lợi khởi nghĩa Lam Sơn', year: 1418 },
  { id: 'event6', name: 'Cách mạng tháng Tám', year: 1945 },
  { id: 'event7', name: 'Chiến thắng Điện Biên Phủ', year: 1954 }
];

export function EventConnector() {
  const [selectedEvent1, setSelectedEvent1] = useState<EventOption | null>(null);
  const [selectedEvent2, setSelectedEvent2] = useState<EventOption | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeConnection = () => {
    if (!selectedEvent1 || !selectedEvent2) return;

    setIsAnalyzing(true);
    
    // Mock AI analysis
    setTimeout(() => {
      const mockConnections: Connection[] = [
        {
          type: 'cause',
          description: 'Cả hai sự kiện đều có nguồn gốc từ chính sách áp bức của ngoại xâm, tạo nên ý chí kháng chiến mạnh mẽ trong dân tộc.',
          strength: 85
        },
        {
          type: 'effect',
          description: 'Cách thức tổ chức và chiến lược từ sự kiện trước đã ảnh hưởng đến cách tiếp cận của sự kiện sau.',
          strength: 70
        },
        {
          type: 'inspiration',
          description: 'Tinh thần bất khuất và quyết tâm giành độc lập từ sự kiện đầu đã trở thành nguồn cảm hứng cho các thế hệ sau.',
          strength: 90
        },
        {
          type: 'parallel',
          description: 'Cả hai đều sử dụng địa hình và hiểu biết về môi trường để đánh bại kẻ thù mạnh hơn.',
          strength: 75
        }
      ];
      
      setConnections(mockConnections);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getConnectionTypeLabel = (type: string) => {
    switch (type) {
      case 'cause': return 'Nguyên nhân chung';
      case 'effect': return 'Ảnh hưởng trực tiếp';
      case 'parallel': return 'Đặc điểm tương đồng';
      case 'inspiration': return 'Cảm hứng lịch sử';
      default: return type;
    }
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'cause': return 'text-red-400 border-red-700 bg-red-900/20';
      case 'effect': return 'text-blue-400 border-blue-700 bg-blue-900/20';
      case 'parallel': return 'text-yellow-400 border-yellow-700 bg-yellow-900/20';
      case 'inspiration': return 'text-purple-400 border-purple-700 bg-purple-900/20';
      default: return 'text-slate-400 border-slate-700 bg-slate-900/20';
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Network className="w-5 h-5 text-purple-400" />
        <div>
          <h3 className="text-white">AI Nhà Khảo Cổ Học</h3>
          <p className="text-slate-400 text-sm">Khám phá mối liên hệ giữa các sự kiện lịch sử</p>
        </div>
      </div>

      {/* Event Selection */}
      <div className="space-y-3">
        <div>
          <label className="text-slate-300 text-sm mb-2 block">Sự kiện thứ nhất:</label>
          <select
            value={selectedEvent1?.id || ''}
            onChange={(e) => {
              const event = eventOptions.find(ev => ev.id === e.target.value);
              setSelectedEvent1(event || null);
              setConnections([]);
            }}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">-- Chọn sự kiện --</option>
            {eventOptions.map(event => (
              <option key={event.id} value={event.id}>
                {event.name} ({event.year})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-5 h-5 text-slate-600" />
        </div>

        <div>
          <label className="text-slate-300 text-sm mb-2 block">Sự kiện thứ hai:</label>
          <select
            value={selectedEvent2?.id || ''}
            onChange={(e) => {
              const event = eventOptions.find(ev => ev.id === e.target.value);
              setSelectedEvent2(event || null);
              setConnections([]);
            }}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">-- Chọn sự kiện --</option>
            {eventOptions
              .filter(ev => ev.id !== selectedEvent1?.id)
              .map(event => (
                <option key={event.id} value={event.id}>
                  {event.name} ({event.year})
                </option>
              ))}
          </select>
        </div>
      </div>

      <Button
        onClick={analyzeConnection}
        disabled={!selectedEvent1 || !selectedEvent2 || isAnalyzing}
        className="w-full"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        {isAnalyzing ? 'Đang phân tích...' : 'Phân tích mối liên hệ'}
      </Button>

      {/* Loading State */}
      {isAnalyzing && (
        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
            </motion.div>
            <p className="text-slate-300 text-sm">AI đang phân tích mối liên hệ...</p>
          </div>
        </Card>
      )}

      {/* Results */}
      {connections.length > 0 && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <p className="text-white text-sm">Kết quả phân tích:</p>
          </div>

          {/* Visual Connection */}
          <Card className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-700/50">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-xs">A</span>
                </div>
                <p className="text-white text-xs">{selectedEvent1?.name}</p>
                <p className="text-slate-400 text-xs">{selectedEvent1?.year}</p>
              </div>

              <div className="flex-1 flex flex-col items-center">
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-purple-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </motion.div>
                <p className="text-purple-400 text-xs mt-2">{connections.length} mối liên hệ</p>
              </div>

              <div className="flex-1 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-xs">B</span>
                </div>
                <p className="text-white text-xs">{selectedEvent2?.name}</p>
                <p className="text-slate-400 text-xs">{selectedEvent2?.year}</p>
              </div>
            </div>
          </Card>

          {/* Connection Details */}
          <div className="space-y-3">
            {connections.map((connection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-4 border ${getConnectionColor(connection.type)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className={getConnectionColor(connection.type)}>
                      {getConnectionTypeLabel(connection.type)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${connection.strength}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">{connection.strength}%</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm">{connection.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Summary Card */}
          <Card className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-700/50">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 mt-1" />
              <div>
                <p className="text-white text-sm mb-1">Tổng kết AI:</p>
                <p className="text-slate-300 text-sm">
                  Hai sự kiện này có mối liên hệ chặt chẽ với nhau qua nhiều khía cạnh. 
                  Việc hiểu được mối liên hệ này giúp bạn có cái nhìn sâu sắc hơn về 
                  dòng chảy lịch sử và tinh thần dân tộc Việt Nam.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
