/**
 * UI chatbot ở panel phải.
 * Component này quản lý trạng thái hội thoại phía client và gọi chat.service để lấy phản hồi từ backend.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import type { HistoricalEvent } from '@/features/map/types/history.types';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Send } from 'lucide-react';
import type { ChatContext } from '../types/chat.types';
import { sendChatMessage } from '../services/chat.service';

interface RealChatBotProps {
  token: string;
  selectedContext?: HistoricalEvent | null;
  onUnauthorized?: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

export function RealChatBot({ token, selectedContext, onUnauthorized }: RealChatBotProps) {
  // Danh sách tin nhắn được giữ ở local state để render realtime.
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      content: 'Xin chào, tôi là trợ lý văn hoá. Hãy đặt câu hỏi để bắt đầu.',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // selectedContext đến từ marker đang chọn trên map; hiện dùng để hiển thị ngữ cảnh cho người dùng.
  const context = useMemo<ChatContext | undefined>(() => {
    if (!selectedContext) {
      return undefined;
    }

    return {
      name: selectedContext.name,
      period: selectedContext.period,
      location: selectedContext.locationLabel || selectedContext.location || selectedContext.basicInfo.location,
      content: selectedContext.cultureContent,
    };
  }, [selectedContext]);

  useEffect(() => {
    // Tự cuộn xuống cuối khi có tin nhắn mới hoặc bot đang typing.
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const message = inputValue.trim();
    if (!message || isTyping) {
      return;
    }

    setError('');
    setInputValue('');
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        role: 'user',
        content: message,
      },
    ]);

    try {
      setIsTyping(true);
      // Luồng gửi gốc: chỉ gửi message + token.
      const result = await sendChatMessage({ token, message });
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot`,
          role: 'bot',
          content: result.reply,
        },
      ]);
    } catch (err) {
      const status = (err as Error & { status?: number }).status;
      // Token hết hạn/không hợp lệ -> đẩy quyền xử lý logout về App.
      if (status === 401 && onUnauthorized) {
        onUnauthorized();
        return;
      }
      setError(err instanceof Error ? err.message : 'Không gửi được tin nhắn');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 gap-3">
      <Card className="p-3 bg-slate-800 border-slate-700">
        <p className="text-white text-sm">Trợ lý văn hoá</p>
        <p className="text-slate-400 text-xs mt-1">
          {context
            ? `Ngữ cảnh: ${context.name} - ${context.period}`
            : 'Không có ngữ cảnh được chọn. Bạn vẫn có thể hỏi bình thường.'}
        </p>
      </Card>

      <div className="flex-1 overflow-y-auto space-y-3 bg-slate-900 rounded-lg border border-slate-800 p-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-100'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-slate-400 text-sm">Đang trả lời...</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              void handleSend();
            }
          }}
          placeholder="Nhập câu hỏi..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
        <Button onClick={() => void handleSend()} disabled={!inputValue.trim() || isTyping}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
