export interface ChatContext {
  name: string;
  period: string;
  location?: string;
  content?: string;
}

export interface ChatReply {
  reply: string;
}
