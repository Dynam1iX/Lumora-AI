/**
 * API Service для интеграции с Lumora AI Backend
 *
 * Backend API v2.0 - AI заменяет первую линию поддержки
 */

const API_URL = import.meta.env.VITE_API_URL || '';

// ==================== TYPES ====================

export interface Ticket {
  id: number;
  user_name: string;
  email: string;
  category: TicketCategory;
  problem: string;
  status: TicketStatus;
  priority: TicketPriority;
  ai_attempted: boolean;
  ai_solution: string | null;
  ai_confidence: number | null;
  created_at: string;
  updated_at: string;
  admin_response: string | null;
}

export type TicketCategory =
  | 'access_passwords'
  | 'network'
  | 'printers'
  | 'software'
  | 'hardware'
  | 'other';

export type TicketStatus =
  | 'new'
  | 'ai_processing'
  | 'ai_resolved'
  | 'needs_human'
  | 'in_progress'
  | 'resolved'
  | 'closed';

export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface KnowledgeArticle {
  id: number;
  category: TicketCategory;
  title: string;
  problem: string;
  solution: string;
  keywords: string;
}

export interface SupportRequest {
  user_name: string;
  email: string;
  problem: string;
}

export interface TicketStats {
  tickets_by_status: Record<string, number>;
}

// ==================== CATEGORY LABELS ====================

export const CATEGORY_LABELS: Record<TicketCategory, string> = {
  access_passwords: 'Доступы и пароли',
  network: 'Сеть и интернет',
  printers: 'Принтеры',
  software: 'Программное обеспечение',
  hardware: 'Оборудование',
  other: 'Прочее',
};

export const PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  critical: 'Критический',
};

export const STATUS_LABELS: Record<TicketStatus, string> = {
  new: 'Новый',
  ai_processing: 'AI обрабатывает',
  ai_resolved: 'Решено AI',
  needs_human: 'Требуется специалист',
  in_progress: 'В работе',
  resolved: 'Решено',
  closed: 'Закрыто',
};

// ==================== API FUNCTIONS ====================

/**
 * ГЛАВНЫЙ ENDPOINT - Создать обращение в поддержку
 * AI автоматически:
 * - Создает тикет
 * - Определяет категорию
 * - Определяет приоритет
 * - Пытается решить
 * - Решает нужен ли человек
 */
export async function createSupportRequest(request: SupportRequest): Promise<Ticket> {
  const response = await fetch(`${API_URL}/api/support`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || 'Failed to create support request');
  }

  return response.json();
}

/**
 * Получить тикеты пользователя по email
 */
export async function getMyTickets(email: string): Promise<Ticket[]> {
  const response = await fetch(`${API_URL}/api/support/my-tickets?email=${encodeURIComponent(email)}`);

  if (!response.ok) {
    throw new Error('Failed to fetch tickets');
  }

  return response.json();
}

/**
 * Получить конкретный тикет по ID
 */
export async function getTicket(ticketId: number): Promise<Ticket> {
  const response = await fetch(`${API_URL}/api/tickets/${ticketId}`);

  if (!response.ok) {
    throw new Error('Ticket not found');
  }

  return response.json();
}

/**
 * Поиск в базе знаний
 */
export async function searchKnowledge(
  query: string,
  category?: TicketCategory,
  limit: number = 10
): Promise<{ results: KnowledgeArticle[]; total: number }> {
  const params = new URLSearchParams({ q: query, limit: limit.toString() });
  if (category) {
    params.append('category', category);
  }

  const response = await fetch(`${API_URL}/api/knowledge/search?${params}`);

  if (!response.ok) {
    throw new Error('Search failed');
  }

  return response.json();
}

/**
 * Получить статью из базы знаний
 */
export async function getKnowledgeArticle(articleId: number): Promise<KnowledgeArticle> {
  const response = await fetch(`${API_URL}/api/knowledge/${articleId}`);

  if (!response.ok) {
    throw new Error('Article not found');
  }

  return response.json();
}

// ==================== ADMIN API ====================

/**
 * Получить все тикеты (admin)
 */
export async function getAllTickets(
  username: string,
  password: string,
  status?: TicketStatus,
  category?: TicketCategory
): Promise<Ticket[]> {
  const params = new URLSearchParams({ username, password });
  if (status) params.append('status', status);
  if (category) params.append('category', category);

  const response = await fetch(`${API_URL}/api/admin/tickets?${params}`);

  if (!response.ok) {
    throw new Error('Unauthorized or failed to fetch tickets');
  }

  return response.json();
}

/**
 * Обновить тикет (admin)
 */
export async function updateTicket(
  ticketId: number,
  username: string,
  password: string,
  update: {
    status?: TicketStatus;
    priority?: TicketPriority;
    admin_response?: string;
  }
): Promise<Ticket> {
  const params = new URLSearchParams({ username, password });

  const response = await fetch(`${API_URL}/api/admin/tickets/${ticketId}?${params}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  });

  if (!response.ok) {
    throw new Error('Failed to update ticket');
  }

  return response.json();
}

/**
 * Добавить статью в базу знаний (admin)
 */
export async function createKnowledgeArticle(
  username: string,
  password: string,
  article: Omit<KnowledgeArticle, 'id'>
): Promise<KnowledgeArticle> {
  const params = new URLSearchParams({ username, password });

  const response = await fetch(`${API_URL}/api/admin/knowledge?${params}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    throw new Error('Failed to create article');
  }

  return response.json();
}

/**
 * Получить статистику (admin)
 */
export async function getStats(username: string, password: string): Promise<TicketStats> {
  const params = new URLSearchParams({ username, password });

  const response = await fetch(`${API_URL}/api/admin/stats?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }

  return response.json();
}

/**
 * Health check
 */
export async function healthCheck(): Promise<{ status: string; database: string; api: string }> {
  const response = await fetch(`${API_URL}/health`);
  return response.json();
}
