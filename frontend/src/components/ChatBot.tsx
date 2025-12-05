// components/ChatBot.tsx - Главный компонент чата

import { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Приветствую! Я AI-ассистент поддержки. Я могу помочь решить большинство проблем автоматически. Если вопрос сложный, я передам его нашим специалистам.',
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Автоскролл к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // TODO: Бэкендер подключит API здесь
      // const response = await chatService.sendMessage({
      //   session_id: 'unique-session-id',
      //   message: text,
      // });

      // Имитация ответа бота (заглушка)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: 'Спасибо за ваш вопрос. К сожалению, backend еще не подключен, но как только он будет готов, я смогу вам помочь!',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        confidence: 0.85,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: 'Извините, произошла ошибка. Пожалуйста, попробуйте позже.',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-10">
      {/* Bot Info Card - с анимацией появления */}
      <div className="absolute top-24 left-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl animate-scaleIn hover:scale-105 transition-transform hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.6)]"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
          </div>
          <div>
            <p className="text-sm font-medium text-white">AI Support Bot</p>
            <p className="text-xs text-gray-400">Готов помочь 24/7</p>
          </div>
        </div>
      </div>

      {/* Chat Container - с анимацией подъема */}
      <div className="w-full max-w-4xl h-full max-h-[700px] rounded-3xl flex flex-col shadow-2xl bg-[#1a1f2e] border border-[#2d3748] overflow-hidden animate-slideUp">
        {/* Chat Header */}
        <ChatHeader />

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#0f1419]">
          {messages.map((message, index) => (
            <div
              key={message.id}
              style={{
                animation: `fadeIn 0.3s ease-out ${index * 0.1}s backwards`
              }}
            >
              <ChatMessage message={message} />
            </div>
          ))}
          
          {isLoading && (
            <ChatMessage
              message={{
                id: 'loading',
                type: 'bot',
                text: '',
                timestamp: '',
              }}
              isLoading
            />
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};
