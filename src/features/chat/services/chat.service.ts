import type { ChatReply } from '../types/chat.types';

export type { ChatReply };

interface SendChatPayload {
  token: string;
  message: string;
}

const parseError = async (response: Response, fallback: string) => {
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
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const error = new Error(await parseError(response, 'Gửi tin nhắn thất bại')) as Error & { status?: number };
      error.status = response.status;
      throw error;
    }

    return response.json();
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error('Không kết nối được backend chat. Hãy kiểm tra backend đang chạy ở cổng 3001.');
    }
    throw err instanceof Error ? err : new Error('Gửi tin nhắn thất bại');
  }
};
