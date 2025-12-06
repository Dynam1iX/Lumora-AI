import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, ArrowRight } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: Date;
  level?: 'ai' | 'human';
  needsHumanSupport?: boolean;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Приветствую! Я AI-ассистент поддержки. Я могу помочь решить большинство проблем автоматически. Если вопрос сложный, я передам его нашим специалистам.',
      role: 'bot',
      timestamp: new Date(),
      level: 'ai',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const response = analyzeAndRespond(input);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.text,
        role: 'bot',
        timestamp: new Date(),
        level: response.level,
        needsHumanSupport: response.needsHuman,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);

      // If needs human support, create a ticket automatically
      if (response.needsHuman) {
        setTimeout(() => {
          createSupportTicket(input, response.category);
          const ticketConfirm: Message = {
            id: (Date.now() + 2).toString(),
            content: 'Заявка создана и передана специалистам. Номер заявки: #' + Date.now().toString().slice(-6) + '\n\nСпециалист свяжется с вами в течение 15 минут.',
            role: 'bot',
            timestamp: new Date(),
            level: 'human',
          };
          setMessages((prev) => [...prev, ticketConfirm]);
        }, 1000);
      }
    }, 1500);
  };

  const analyzeAndRespond = (userInput: string): { text: string; level: 'ai' | 'human'; needsHuman: boolean; category: string } => {
    // TODO: Заменить на реальный AI/ML анализ через backend API
    // 
    // Пример запроса к backend:
    // const response = await fetch('/api/ai/analyze', {
    //   method: 'POST',
    //   body: JSON.stringify({ message: userInput }),
    // });
    // const aiResponse = await response.json();
    // 
    // Backend должен вернуть:
    // {
    //   text: string,           // Ответ AI
    //   level: 'ai' | 'human',  // Уровень обработки
    //   needsHuman: boolean,    // Нужна ли эскалация
    //   category: string,       // Категория запроса
    //   confidence: number      // Уверенность AI (0-1)
    // }

    // ВРЕМЕННЫЙ placeholder для разработки UI
    return {
      text: 'AI Ассистент: Опишите проблему подробнее.\n\nУкажите:\n• Что именно не работает?\n• Когда началась проблема?\n• Какие действия вы уже пробовали?\n\nЯ постараюсь помочь или передам специалисту.',
      level: 'ai',
      needsHuman: false,
      category: 'Общие',
    };
  };

  const createSupportTicket = (description: string, category: string) => {
    // TODO: Заменить на реальный API запрос к backend
    // 
    // Пример:
    // const response = await fetch('/api/tickets/create', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     description,
    //     category,
    //     priority: 'high',
    //     aiEscalated: true
    //   })
    // });

    // ВРЕМЕННО: сохраняем в localStorage для разработки UI
    const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    
    const newTicket = {
      id: Date.now().toString(),
      title: 'AI эскалация: ' + description.slice(0, 50) + '...',
      description: description,
      category: category,
      priority: 'high',
      status: 'awaiting_support',
      name: 'AI System',
      email: 'ai-escalation@system.local',
      phone: '',
      createdAt: new Date().toISOString(),
      aiEscalated: true,
      supportLevel: 2,
    };
    
    localStorage.setItem('tickets', JSON.stringify([...existingTickets, newTicket]));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Bot Info Card */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 mb-6 flex items-center space-x-4 hover:border-white/20 transition-all duration-300 animate-[scaleIn_0.5s_ease-out] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-110 animate-[glow_2s_ease-in-out_infinite]">
          <Bot className="w-8 h-8 text-black" />
        </div>
        <div>
          <h2 className="text-white text-lg">AI Support Bot</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
            <p className="text-white/50 text-sm">Онлайн и готов помочь</p>
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
                message.role === 'user' 
                  ? 'flex-row-reverse' 
                  : 'space-x-2 sm:space-x-3'
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
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-white/5 p-3 sm:p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2 sm:space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Опишите вашу проблему..."
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-[#2a2a2a] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-white/30"
            />
            <button
              type="submit"
              className="px-4 sm:px-6 py-3 sm:py-4 bg-white text-black rounded-2xl hover:bg-white/90 transition-all duration-300 flex-shrink-0"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}