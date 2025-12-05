// components/ChatBot.tsx - Главный компонент чата (как на скрине)

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
    <div className="flex flex-col h-screen bg-dark-bg">
      {/* Chat Box */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-5xl h-full max-h-[800px] bg-dark-secondary rounded-2xl border border-dark-tertiary flex flex-col shadow-2xl">
          {/* Chat Header */}
          <ChatHeader />

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
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
    </div>
  );
};
