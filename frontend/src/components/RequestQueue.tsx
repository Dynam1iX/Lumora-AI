import { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertTriangle, User, Mail, Calendar, AlertCircleIcon } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  aiEscalated?: boolean;
  supportLevel?: number;
}

export default function RequestQueue() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    const stored = localStorage.getItem('tickets');
    if (stored) {
      setTickets(JSON.parse(stored));
    }
  };

  const updateTicketStatus = (ticketId: string, newStatus: string) => {
    const updated = tickets.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updated);
    localStorage.setItem('tickets', JSON.stringify(updated));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  };

  const deleteTicket = (ticketId: string) => {
    const updated = tickets.filter((ticket) => ticket.id !== ticketId);
    setTickets(updated);
    localStorage.setItem('tickets', JSON.stringify(updated));
    setSelectedTicket(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      default:
        return 'bg-white/10 text-white border-white/30';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'Критичный';
      case 'high':
        return 'Высокий';
      case 'medium':
        return 'Средний';
      case 'low':
        return 'Низкий';
      default:
        return priority;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 'awaiting_support':
        return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'in_progress':
        return <AlertCircleIcon className="w-5 h-5 text-yellow-400" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Clock className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'Открыт';
      case 'awaiting_support':
        return 'Ожидает';
      case 'in_progress':
        return 'В работе';
      case 'resolved':
        return 'Решен';
      case 'closed':
        return 'Закрыт';
      default:
        return status;
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  const openCount = tickets.filter(t => t.status === 'open').length;
  const awaitingCount = tickets.filter(t => t.status === 'awaiting_support').length;
  const inProgressCount = tickets.filter(t => t.status === 'in_progress').length;

  if (selectedTicket) {
    return (
      <div className="glass-strong rounded-2xl shadow-2xl border border-white/10 p-8 relative z-10">
        <button
          onClick={() => setSelectedTicket(null)}
          className="text-white hover:text-white/80 mb-6 transition-colors"
        >
          ← Вернуться к списку
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Details */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-white mb-3">{selectedTicket.title}</h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 glass rounded-full text-sm text-[#99a1af] border border-white/10">
                      {selectedTicket.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm border ${getPriorityColor(selectedTicket.priority)}`}>
                      {getPriorityLabel(selectedTicket.priority)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 glass px-4 py-2 rounded-lg border border-white/10">
                  {getStatusIcon(selectedTicket.status)}
                  <span className="text-[#99a1af]">{getStatusLabel(selectedTicket.status)}</span>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-white mb-3">Описание проблемы</h3>
                <p className="text-[#99a1af] whitespace-pre-line">{selectedTicket.description}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="glass rounded-xl p-6 border border-white/10">
              <h3 className="text-white mb-4">Действия</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateTicketStatus(selectedTicket.id, 'in_progress')}
                  className="px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition-all duration-300"
                >
                  В работе
                </button>
                <button
                  onClick={() => updateTicketStatus(selectedTicket.id, 'resolved')}
                  className="px-4 py-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/20 transition-all duration-300"
                >
                  Решен
                </button>
                <button
                  onClick={() => updateTicketStatus(selectedTicket.id, 'open')}
                  className="px-4 py-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all duration-300"
                >
                  Открыт
                </button>
                <button
                  onClick={() => updateTicketStatus(selectedTicket.id, 'closed')}
                  className="px-4 py-3 bg-gray-500/10 border border-gray-500/30 text-gray-400 rounded-lg hover:bg-gray-500/20 transition-all duration-300"
                >
                  Закрыт
                </button>
              </div>

              <button
                onClick={() => deleteTicket(selectedTicket.id)}
                className="w-full mt-4 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300"
              >
                Удалить заявку
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="glass border border-white/10 rounded-xl p-4">
              <h3 className="text-white mb-4">Информация</h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-[#99a1af] mt-0.5" />
                  <div>
                    <p className="text-sm text-[#99a1af]">Имя</p>
                    <p className="text-white">{selectedTicket.name}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#99a1af] mt-0.5" />
                  <div>
                    <p className="text-sm text-[#99a1af]">Email</p>
                    <p className="text-white break-all">{selectedTicket.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-[#99a1af] mt-0.5" />
                  <div>
                    <p className="text-sm text-[#99a1af]">Создан</p>
                    <p className="text-white">
                      {new Date(selectedTicket.createdAt).toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-2xl shadow-2xl border border-white/10 p-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            filter === 'all'
              ? 'bg-white text-black'
              : 'glass text-[#99a1af] border border-white/10'
          }`}
        >
          Все ({tickets.length})
        </button>
        <button
          onClick={() => setFilter('open')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            filter === 'open'
              ? 'bg-white text-black'
              : 'glass text-[#99a1af] border border-white/10'
          }`}
        >
          Открыт ({openCount})
        </button>
        <button
          onClick={() => setFilter('awaiting_support')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            filter === 'awaiting_support'
              ? 'bg-white text-black'
              : 'glass text-[#99a1af] border border-white/10'
          }`}
        >
          Ожидает ({awaitingCount})
        </button>
        <button
          onClick={() => setFilter('in_progress')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            filter === 'in_progress'
              ? 'bg-white text-black'
              : 'glass text-[#99a1af] border border-white/10'
          }`}
        >
          В работе ({inProgressCount})
        </button>
      </div>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-[#4a5565] mx-auto mb-4" />
          <h3 className="text-white mb-2">Нет заявок</h3>
          <p className="text-[#99a1af]">Здесь будут отображаться входящие заявки</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className="glass border border-white/10 rounded-xl p-4 hover:border-white/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(ticket.status)}
                    <h4 className="text-white">{ticket.title}</h4>
                  </div>
                  <p className="text-[#99a1af] text-sm line-clamp-1">{ticket.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm border whitespace-nowrap ${getPriorityColor(ticket.priority)}`}>
                  {getPriorityLabel(ticket.priority)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center space-x-4 text-sm text-[#99a1af]">
                  <span className="px-2 py-1 glass rounded border border-white/10">
                    {ticket.category}
                  </span>
                  <span>ID #{ticket.id.slice(-6)}</span>
                  <span>{ticket.name}</span>
                </div>
                <span className="text-sm text-[#99a1af]">
                  {new Date(ticket.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}