export interface ChatContext {
  name: string;
  period: string;
  location?: string;
  content?: string;
}

interface SendChatPayload {
  token: string;
  message: string;
  context?: ChatContext;
}

export interface ChatReply {
  reply: string;
}

const buildMessage = (message: string, context?: ChatContext) => {
  if (!context) {
    return message;
  }

  const contextLines = [
    `Tên mục: ${context.name}`,
    `Thời kỳ: ${context.period}`,
    context.location ? `Địa điểm: ${context.location}` : null,
    context.content ? `Nội dung tham chiếu: ${context.content}` : null,
  ].filter(Boolean);

  return `[Ngữ cảnh]\n${contextLines.join('\n')}\n\n[Câu hỏi]\n${message}`;
};

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

export const sendChatMessage = async ({ token, message, context }: SendChatPayload): Promise<ChatReply> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: buildMessage(message, context) }),
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
