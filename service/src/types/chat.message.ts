import { UUID } from "crypto";

export interface ChatMessage {
  id: UUID
  name: string;
  message: string;
  dateCreated: Date;
}