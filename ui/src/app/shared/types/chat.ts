export interface ChatMessage {
  id: string,
  name: string;
  message: string;
  createdAt: Date;
  receivedAt: Date | null;
}