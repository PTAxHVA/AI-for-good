import { useState } from 'react';
import { LoginPage } from '@/features/auth/components/LoginPage';
import { RealChatBot } from '@/features/chat/components/RealChatBot';
import { EventConnector } from '@/features/connectors/components/EventConnector';
import { Dashboard } from '@/features/dashboard/components/Dashboard';
import { GamificationBar } from '@/features/dashboard/components/GamificationBar';
import { HistoryMap } from '@/features/map/components/HistoryMap';
import { LocationInfoPanel } from '@/features/map/components/LocationInfoPanel';
import { Timeline } from '@/features/map/components/Timeline';
import type { HistoricalEvent } from '@/features/map/types/history.types';
import { QuizPanel } from '@/features/quiz/components/QuizPanel';
import { StudyPath } from '@/features/study-path/components/StudyPath';
import type { LoggedUser } from '@/features/auth/services/auth.service';
import { Button } from '@/shared/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { MapPin, MessageSquare, Network, BookOpen, BarChart3, LogOut } from 'lucide-react';

function App() {
  const [user, setUser] = useState<LoggedUser | null>(() => {
    const saved = window.localStorage.getItem('loggedUser');
    if (!saved) {
      return null;
    }

    try {
      return JSON.parse(saved);
    } catch {
      window.localStorage.removeItem('loggedUser');
      return null;
    }
  });
  const [selectedYear, setSelectedYear] = useState(1945);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [activeView, setActiveView] = useState<'map' | 'dashboard'>('map');
  const [showNPCChat, setShowNPCChat] = useState(false);
  const [showEventConnector, setShowEventConnector] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [unlockedEvents] = useState<string[]>([]);

  const handleEventUnlock = (event: HistoricalEvent) => {
    setSelectedEvent(event);
  };

  const handleQuizComplete = (score: number) => {
    setUserPoints(prev => prev + score);
    setShowQuiz(false);
  };

  const handleLoginSuccess = (loggedUser: LoggedUser) => {
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    setUser(loggedUser);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    setSelectedEvent(null);
    setShowNPCChat(false);
    setShowEventConnector(false);
    setShowQuiz(false);
  };

  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="h-screen w-full flex flex-col bg-[#1A1A1A]">
      {/* Header */}
      <header className="bg-[#2D2D2D] border-b-2 border-[#C8A452] p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3">
            {/* Seal/Emblem Icon */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1538] to-[#5C0F26] flex items-center justify-center border-2 border-[#C8A452] shadow-lg">
                <svg className="w-6 h-6 text-[#C8A452]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  <path d="M12 5.5l6 3v6c0 3.33-2.31 6.44-5.5 7.25-3.19-.81-5.5-3.92-5.5-7.25v-6l5-3z" fill="#1A1A1A"/>
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#C8A452] rounded-full border-2 border-[#2D2D2D] animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-[#F5ECD7] tracking-wide" style={{ fontFamily: 'serif' }}>AI Học Sử?!</h1>
              <p className="text-[#C8A452] text-sm">Khám phá lịch sử Việt Nam</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={activeView === 'map' ? 'default' : 'ghost'}
              onClick={() => setActiveView('map')}
              className={activeView === 'map' ? 'bg-[#8B1538] hover:bg-[#A41E3F] text-[#F5ECD7] border border-[#C8A452]' : 'text-[#C8A452] hover:bg-[#3A3A3A]'}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Bản đồ
            </Button>
            <Button
              variant={activeView === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveView('dashboard')}
              className={activeView === 'dashboard' ? 'bg-[#8B1538] hover:bg-[#A41E3F] text-[#F5ECD7] border border-[#C8A452]' : 'text-[#C8A452] hover:bg-[#3A3A3A]'}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-[#C8A452] hover:bg-[#3A3A3A]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </div>

          <GamificationBar points={userPoints} level={Math.floor(userPoints / 100) + 1} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'map' ? (
          <div className="h-full flex">
            {/* Left Panel - Tools */}
            <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-2 overflow-y-auto">
              <h3 className="text-white mb-4">Công cụ AI</h3>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowNPCChat(!showNPCChat)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Nhập vai lịch sử
              </Button>

              <StudyPath 
                unlockedEvents={unlockedEvents}
                currentEvent={selectedEvent}
              />

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowEventConnector(!showEventConnector)}
              >
                <Network className="w-4 h-4 mr-2" />
                Kết nối sự kiện
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowQuiz(!showQuiz)}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Quiz cá nhân hóa
              </Button>
            </div>

            {/* Center - Map */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                <HistoryMap
                  selectedYear={selectedYear}
                  onEventSelect={handleEventUnlock}
                  unlockedEvents={unlockedEvents}
                />
              </div>
              
              <Timeline
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
                minYear={1000}
                maxYear={2000}
              />
            </div>

            {/* Right Panel - Context */}
            <div className="w-96 bg-slate-900 border-l border-slate-800 overflow-y-auto">
              <Tabs defaultValue="info" className="h-full">
                <TabsList className="w-full grid grid-cols-3 bg-slate-800">
                  <TabsTrigger value="info">Thông tin</TabsTrigger>
                  <TabsTrigger value="chat" disabled={!showNPCChat}>Hội thoại</TabsTrigger>
                  <TabsTrigger value="connector" disabled={!showEventConnector}>Kết nối</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="p-4">
                  {selectedEvent ? (
                    <LocationInfoPanel event={selectedEvent} />
                  ) : (
                    <div className="text-slate-400 text-center mt-8">
                      Chọn một biểu tượng trên bản đồ để xem thông tin văn hoá
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="chat" className="h-full">
                  {showNPCChat && (
                    <RealChatBot
                      token={user.token}
                      selectedContext={selectedEvent}
                      onUnauthorized={handleLogout}
                    />
                  )}
                </TabsContent>

                <TabsContent value="connector" className="h-full">
                  {showEventConnector && (
                    <EventConnector />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <Dashboard 
            userPoints={userPoints}
            unlockedEvents={unlockedEvents}
          />
        )}
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <QuizPanel
              onComplete={handleQuizComplete}
              onClose={() => setShowQuiz(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
