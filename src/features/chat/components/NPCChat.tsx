import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { HistoricalEvent } from '@/features/map/types/history.types';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Send, Sparkles } from 'lucide-react';

interface NPCChatProps {
  event: HistoricalEvent;
}

interface Message {
  id: string;
  role: 'user' | 'npc';
  content: string;
  timestamp: Date;
}

// NPC personas based on historical periods
const getNPCPersona = (event: HistoricalEvent) => {
  const personas: { [key: string]: { name: string; role: string; avatar: string } } = {
    'Thời kỳ Bắc thuộc': { name: 'Người dân Mê Linh', role: 'Nông dân thời Hai Bà Trưng', avatar: '👨‍🌾' },
    'Thời kỳ tự chủ': { name: 'Chiến binh', role: 'Quân sĩ thời Ngô Quyền', avatar: '⚔️' },
    'Nhà Lý': { name: 'Quan lại', role: 'Viên chức triều đình', avatar: '📜' },
    'Nhà Trần': { name: 'Tướng sĩ', role: 'Chiến binh chống Mông Cổ', avatar: '🛡️' },
    'Nhà Lê': { name: 'Nghĩa quân', role: 'Chiến sĩ khởi nghĩa Lam Sơn', avatar: '🗡️' },
    'Cận đại': { name: 'Bộ đội', role: 'Chiến sĩ giải phóng', avatar: '🎖️' }
  };

  return personas[event.period] || { name: 'Nhân chứng lịch sử', role: 'Người trong cuộc', avatar: '👤' };
};

export function NPCChat({ event }: NPCChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const npcPersona = getNPCPersona(event);

  useEffect(() => {
    // Initial greeting
    const greeting: Message = {
      id: '1',
      role: 'npc',
      content: `Xin chào! Tôi là ${npcPersona.name}, ${npcPersona.role}. Tôi đã trải qua sự kiện ${event.name}. Bạn muốn hỏi tôi điều gì về thời kỳ này?`,
      timestamp: new Date()
    };
    setMessages([greeting]);
  }, [event]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateNPCResponse = (userMessage: string): string => {
    // Simple mock AI responses based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('sao') || lowerMessage.includes('tại sao') || lowerMessage.includes('nguyên nhân')) {
      return `Theo những gì tôi biết, ${event.detailedInfo.cause}. Đó là lý do chính dẫn đến sự kiện này.`;
    }
    
    if (lowerMessage.includes('như thế nào') || lowerMessage.includes('diễn ra') || lowerMessage.includes('diễn biến')) {
      return `Sự kiện diễn ra như sau: ${event.detailedInfo.development}. Tôi còn nhớ như in những ngày đó.`;
    }
    
    if (lowerMessage.includes('kết quả') || lowerMessage.includes('sau đó') || lowerMessage.includes('cuối cùng')) {
      return `Cuối cùng, ${event.detailedInfo.result}. Đó là một thời điểm quan trọng trong lịch sử.`;
    }
    
    if (lowerMessage.includes('cảm xúc') || lowerMessage.includes('cảm nhận') || lowerMessage.includes('nghĩ gì')) {
      return `Là người trực tiếp trải qua, tôi cảm thấy vừa lo lắng vừa hy vọng. Chúng tôi tin rằng những gì mình làm sẽ thay đổi vận mệnh đất nước.`;
    }
    
    if (lowerMessage.includes('nhân vật') || lowerMessage.includes('người') || lowerMessage.includes('ai')) {
      return `Những người quan trọng nhất trong sự kiện này là ${event.detailedInfo.characters.join(', ')}. Họ đều là những con người phi thường.`;
    }

    if (lowerMessage.includes('ảnh hưởng') || lowerMessage.includes('tác động')) {
      return `Sự kiện này đã tạo ra những thay đổi lớn: ${event.advancedInfo.territoryChanges}. Nó định hình cả một thời đại.`;
    }
    
    // Default response
    return `Đó là một câu hỏi hay. Theo kinh nghiệm của tôi tại ${event.basicInfo.location} vào ${event.basicInfo.time}, tôi có thể nói rằng ${event.basicInfo.mainEvent} đã thay đổi cuộc sống của chúng tôi mãi mãi.`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const npcResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'npc',
        content: generateNPCResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, npcResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestedQuestions = [
    'Tại sao sự kiện này xảy ra?',
    'Sự kiện diễn ra như thế nào?',
    'Kết quả của sự kiện là gì?',
    'Bạn cảm thấy thế nào khi ở đó?'
  ];

  return (
    <div className="flex flex-col h-full p-4">
      {/* NPC Header */}
      <Card className="p-4 mb-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-700/50">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 bg-purple-700">
            <AvatarFallback className="text-2xl">{npcPersona.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white">{npcPersona.name}</p>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-slate-400 text-sm">{npcPersona.role}</p>
          </div>
        </div>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-200'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString('vi-VN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-slate-800 rounded-lg p-3">
              <div className="flex gap-1">
                <motion.div
                  className="w-2 h-2 bg-slate-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-slate-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-slate-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="mb-4">
          <p className="text-slate-400 text-sm mb-2">Câu hỏi gợi ý:</p>
          <div className="grid grid-cols-1 gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start text-left h-auto py-2"
                onClick={() => setInputValue(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Đặt câu hỏi cho nhân chứng lịch sử..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
        <Button onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
