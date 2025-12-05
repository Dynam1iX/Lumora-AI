// components/ChatMessage.tsx - Компонент сообщения

import type { Message } from '../types';
import { BotIcon } from './icons/BotIcon';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export const ChatMessage = ({ message, isLoading }: ChatMessageProps) => {
  if (isLoading) {
    return (
      <div className="flex gap-3 max-w-[85%]">
        <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-600 shadow-lg">
          <BotIcon className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="bg-[#2d3748] border border-gray-600 rounded-2xl px-4 py-3 shadow-lg">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isBot = message.type === 'bot';

  return (
    <div className={`flex gap-3 ${isBot ? 'max-w-[85%]' : 'max-w-[85%] ml-auto flex-row-reverse'}`}>
      {isBot && (
        <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-600 shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
          <BotIcon className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className="flex flex-col gap-1.5">
        <div className={`rounded-2xl px-4 py-3 shadow-lg hover:scale-102 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all ${
          isBot 
            ? 'bg-[#2d3748] border border-gray-600 text-gray-100' 
            : 'bg-blue-600 text-white'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>
        
        {message.timestamp && (
          <div className={`text-xs text-gray-500 px-1 ${!isBot && 'text-right'}`}>
            {message.timestamp}
          </div>
        )}
        
        {isBot && message.confidence !== undefined && (
          <div className="text-xs text-gray-500 px-1">
            Уверенность: <span className={message.confidence > 0.8 ? 'text-green-400' : 'text-yellow-400'}>
              {(message.confidence * 100).toFixed(0)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
