// types/index.ts - TypeScript типы для приложения

export interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: string;
  confidence?: number;
}

export interface ChatRequest {
  session_id: string;
  message: string;
  category?: string;
}

export interface ChatResponse {
  response: string;
  confidence_score: number;
  suggest_ticket: boolean;
  relevant_kb_articles: number[];
}

export interface Ticket {
  id: number;
  user_name: string;
  email: string;
  category: TicketCategory;
  problem: string;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
  admin_response?: string;
}

export enum TicketStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum TicketCategory {
  ACCESS_PASSWORDS = 'access_passwords',
  NETWORK = 'network',
  PRINTERS = 'printers',
  SOFTWARE = 'software',
  HARDWARE = 'hardware',
  OTHER = 'other',
}

export interface KnowledgeArticle {
  id: number;
  category: TicketCategory;
  title: string;
  problem: string;
  solution: string;
  keywords: string;
}
