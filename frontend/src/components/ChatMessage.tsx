// components/ChatMessage.tsx - Компонент сообщения в чате

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
        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <BotIcon className="w-5 h-5 text-dark-bg" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="bg-dark-tertiary rounded-xl px-4 py-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isBot = message.type === 'bot';

  return (
    <div className={`flex gap-3 ${isBot ? 'max-w-[85%]' : 'max-w-[85%] ml-auto flex-row-reverse'} animate-fadeIn`}>
      {isBot && (
        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <BotIcon className="w-5 h-5 text-dark-bg" />
        </div>
      )}
      
      <div className="flex flex-col gap-1.5">
        <div className={`rounded-xl px-4 py-3 ${isBot ? 'bg-dark-tertiary text-gray-200' : 'bg-blue-600 text-white'}`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>
        
        {message.timestamp && (
          <div className={`text-xs text-gray-500 px-1 ${!isBot && 'text-right'}`}>
            {message.timestamp}
          </div>
        )}
        
        {isBot && message.confidence !== undefined && (
          <div className="text-xs text-gray-500 px-1">
            Уверенность: <span className={message.confidence > 0.8 ? 'text-green-500' : 'text-yellow-500'}>
              {(message.confidence * 100).toFixed(0)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
