// services/api.ts - API calls к backend

import axios from 'axios';
import type { ChatRequest, ChatResponse, Ticket, KnowledgeArticle } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Chat API
export const chatService = {
  sendMessage: async (data: ChatRequest): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>('/chat', data);
    return response.data;
  },
};

// Tickets API
export const ticketService = {
  create: async (ticketData: Partial<Ticket>): Promise<Ticket> => {
    const response = await api.post<Ticket>('/tickets', ticketData);
    return response.data;
  },
  
  getById: async (id: number): Promise<Ticket> => {
    const response = await api.get<Ticket>(`/tickets/${id}`);
    return response.data;
  },
};

// Knowledge Base API
export const knowledgeService = {
  search: async (query: string, category?: string): Promise<KnowledgeArticle[]> => {
    const params: any = { q: query };
    if (category) params.category = category;
    
    const response = await api.get<{ results: KnowledgeArticle[]; total: number }>('/knowledge/search', { params });
    return response.data.results;
  },
  
  getById: async (id: number): Promise<KnowledgeArticle> => {
    const response = await api.get<KnowledgeArticle>(`/knowledge/${id}`);
    return response.data;
  },
};

export default api;
