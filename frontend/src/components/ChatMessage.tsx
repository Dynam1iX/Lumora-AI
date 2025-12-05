// components/ChatMessage.tsx - Компонент сообщения (GLASSMORPHISM)

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
        <div className="w-9 h-9 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0 border border-white/20 shadow-lg">
          <BotIcon className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-4 py-3 shadow-lg">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
        <div className="w-9 h-9 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0 border border-white/20 shadow-lg">
          <BotIcon className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className="flex flex-col gap-1.5">
        <div className={`rounded-2xl px-4 py-3 shadow-lg ${
          isBot 
            ? 'backdrop-blur-md bg-white/10 border border-white/20 text-gray-100' 
            : 'bg-gradient-to-br from-blue-500/80 to-blue-600/80 backdrop-blur-md border border-blue-400/30 text-white'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>
        
        {message.timestamp && (
          <div className={`text-xs text-gray-400 px-1 ${!isBot && 'text-right'}`}>
            {message.timestamp}
          </div>
        )}
        
        {isBot && message.confidence !== undefined && (
          <div className="text-xs text-gray-400 px-1">
            Уверенность: <span className={message.confidence > 0.8 ? 'text-green-400' : 'text-yellow-400'}>
              {(message.confidence * 100).toFixed(0)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
