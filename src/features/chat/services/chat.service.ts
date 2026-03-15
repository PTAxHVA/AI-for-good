/**
 * Service gọi API chat từ frontend.
 * Luồng chính: nhận message + token từ UI, gọi POST /api/chat, trả về reply cho component chat render.
 */
import type { ChatReply } from '../types/chat.types';

export type { ChatReply };

interface SendChatPayload {
  token: string;
  message: string;
}

const parseError = async (response: Response, fallback: string) => {
  // Backend có thể trả JSON { error }, nhưng vẫn cần fallback nếu response không parse được.
  try {
    const data = await response.json();
    return data.error || fallback;
  } catch {
    if (response.status === 404) {
      return 'Không tìm thấy endpoint /api/chat. Kiểm tra backend và proxy.';
    }
    return fallback;
  }
};

export const sendChatMessage = async ({ token, message }: SendChatPayload): Promise<ChatReply> => {
  try {
    // Theo logic gốc: chỉ gửi raw message, không ghép thêm context trước khi gọi API.
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      // Đính kèm HTTP status vào Error để UI xử lý riêng các case như 401.
      const error = new Error(await parseError(response, 'Gửi tin nhắn thất bại')) as Error & { status?: number };
      error.status = response.status;
      throw error;
    }

    return response.json();
  } catch (err) {
    // TypeError thường xuất hiện khi backend down hoặc proxy không trỏ được.
    if (err instanceof TypeError) {
      throw new Error('Không kết nối được backend chat. Hãy kiểm tra backend đang chạy ở cổng 3001.');
    }
    throw err instanceof Error ? err : new Error('Gửi tin nhắn thất bại');
  }
};
