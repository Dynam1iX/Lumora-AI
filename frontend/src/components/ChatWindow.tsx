import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { createSupportRequest, Ticket, PRIORITY_LABELS, CATEGORY_LABELS, STATUS_LABELS } from '../services/api';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: Date;
  ticketData?: Ticket;
}

// Получаем email и имя из localStorage или запрашиваем
const getUserInfo = () => {
  let email = localStorage.getItem('user_email');
  let name = localStorage.getItem('user_name');

  // Validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (!email || !isValidEmail(email)) {
    do {
      email = prompt('Введите ваш email (например: user@company.com):') || 'user@company.com';
    } while (!isValidEmail(email));
    localStorage.setItem('user_email', email);
  }

  if (!name) {
    name = prompt('Введите ваше имя:') || 'User';
    localStorage.setItem('user_name', name);
  }

  return { email, name };
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Приветствую! Я AI-ассистент техподдержки Lumora AI.\n\n✨ Я могу автоматически решить большинство IT проблем.\n\n📝 При каждом обращении я:\n• Создаю тикет\n• Определяю категорию и приоритет\n• Пытаюсь решить проблему\n• Если не могу - передаю специалисту\n\nОпишите вашу проблему, и я помогу!',
      role: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { email, name } = getUserInfo();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const problemText = input;
    setInput('');
    setIsProcessing(true);

    try {
      // Показываем сообщение о обработке
      const processingMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: '⏳ Обрабатываю ваш запрос...\n\n• Создаю тикет\n• Анализирую проблему\n• Ищу решение в базе знаний\n• Определяю категорию и приоритет',
        role: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, processingMsg]);

      // Отправляем запрос к backend
      const ticket = await createSupportRequest({
        user_name: name,
        email: email,
        problem: problemText,
      });

      // Удаляем сообщение о обработке
      setMessages((prev) => prev.filter((msg) => msg.id !== processingMsg.id));

      // Формируем ответ на основе статуса тикета
      let responseText = '';
      let icon = '';

      if (ticket.status === 'ai_resolved') {
        // AI решил проблему
        icon = '✅';
        responseText = `${icon} **Проблема решена автоматически!**\n\n`;
        responseText += `**Тикет #${ticket.id}**\n`;
        responseText += `Категория: ${CATEGORY_LABELS[ticket.category]}\n`;
        responseText += `Приоритет: ${PRIORITY_LABELS[ticket.priority]}\n`;
        responseText += `Уверенность AI: ${Math.round((ticket.ai_confidence || 0) * 100)}%\n\n`;
        responseText += `**Решение:**\n${ticket.ai_solution}\n\n`;
        responseText += `💡 *Если решение помогло, проблема автоматически закроется. Если нет - тикет будет передан специалисту.*`;
      } else if (ticket.status === 'needs_human') {
        // Нужен специалист
        icon = '⏳';
        responseText = `${icon} **Тикет передан специалисту**\n\n`;
        responseText += `**Тикет #${ticket.id}**\n`;
        responseText += `Категория: ${CATEGORY_LABELS[ticket.category]}\n`;
        responseText += `Приоритет: ${PRIORITY_LABELS[ticket.priority]} ${
          ticket.priority === 'critical' ? '🚨' : ticket.priority === 'high' ? '🔴' : ''
        }\n\n`;

        if (ticket.ai_solution) {
          responseText += `**Пока вы ждете, попробуйте:**\n${ticket.ai_solution}\n\n`;
        }

        responseText += `⏱️ Ожидаемое время ответа: `;
        if (ticket.priority === 'critical') {
          responseText += '30 минут - 1 час';
        } else if (ticket.priority === 'high') {
          responseText += '1-2 часа';
        } else {
          responseText += '2-4 часа';
        }

        responseText += `\n\n📧 Уведомление будет отправлено на: ${email}`;
      }

      const botResponse: Message = {
        id: (Date.now() + 2).toString(),
        content: responseText,
        role: 'bot',
        timestamp: new Date(),
        ticketData: ticket,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error creating support request:', error);

      let errorContent = '❌ **Ошибка обработки запроса**\n\n';

      // Check if it's a validation error
      if (error instanceof Error && error.message.includes('422')) {
        errorContent += '**Проблема валидации данных**\n\n';
        errorContent += 'Возможно неверный формат email. Проверьте:\n\n';
        errorContent += `• Email: ${email}\n`;
        errorContent += `• Имя: ${name}\n\n`;
        errorContent += 'Чтобы исправить:\n';
        errorContent += '1. Откройте DevTools (F12) → Application → Local Storage\n';
        errorContent += '2. Удалите user_email и user_name\n';
        errorContent += '3. Обновите страницу\n';
        errorContent += '4. Введите корректный email';
      } else {
        errorContent += 'Не удалось связаться с сервером. Пожалуйста:\n\n';
        errorContent += '1. Проверьте что backend запущен (http://localhost:8000/health)\n';
        errorContent += '2. Проверьте переменную VITE_API_URL в .env\n';
        errorContent += '3. Проверьте что ANTHROPIC_API_KEY настроен\n';
        errorContent += '4. Попробуйте еще раз\n\n';
        errorContent += `*Ошибка: ${error instanceof Error ? error.message : 'Unknown error'}*`;
      }

      const errorMsg: Message = {
        id: (Date.now() + 3).toString(),
        content: errorContent,
        role: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Bot Info Card */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 mb-6 flex items-center space-x-4 hover:border-white/20 transition-all duration-300 animate-[scaleIn_0.5s_ease-out] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-110 animate-[glow_2s_ease-in-out_infinite]">
          <Bot className="w-8 h-8 text-black" />
        </div>
        <div className="flex-1">
          <h2 className="text-white text-lg">Lumora AI Support Bot</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
            <p className="text-white/50 text-sm">Онлайн • Пользователь: {name}</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col h-[calc(100vh-350px)] overflow-hidden hover:border-white/20 transition-all duration-300 animate-[slideUp_0.6s_ease-out] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex items-start animate-[slideUp_0.4s_ease-out] ${
                message.role === 'user' ? 'flex-row-reverse' : 'space-x-2 sm:space-x-3'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 ${
                  message.role === 'user'
                    ? 'bg-white/10 border border-white/20 hover:border-white/40 ml-2 sm:ml-3'
                    : 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                ) : (
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl max-w-[85%] sm:max-w-[80%] transition-all duration-300 hover:scale-[1.02] ${
                  message.role === 'user'
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]'
                    : 'bg-[#2a2a2a] text-white border border-white/5 hover:border-white/10'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>

                {/* Ticket info if available */}
                {message.ticketData && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-xs text-white/50">
                      Статус: {STATUS_LABELS[message.ticketData.status]} • Создан:{' '}
                      {new Date(message.ticketData.created_at).toLocaleTimeString('ru-RU')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isProcessing && (
            <div className="flex items-start space-x-2 sm:space-x-3 animate-[slideUp_0.4s_ease-out]">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </div>
              <div className="bg-[#2a2a2a] px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/5">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-white/10 p-4 sm:p-6 bg-white/5 backdrop-blur-xl"
        >
          <div className="flex items-center space-x-2 sm:space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Опишите вашу проблему..."
              disabled={isProcessing}
              className="flex-1 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
            />
            <button
              type="submit"
              disabled={isProcessing || !input.trim()}
              className="bg-white text-black p-3 sm:p-4 rounded-2xl hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <p className="text-white/30 text-xs mt-3 text-center">
            Каждое сообщение создает тикет и обрабатывается AI
          </p>
        </form>
      </div>
    </div>
  );
}
