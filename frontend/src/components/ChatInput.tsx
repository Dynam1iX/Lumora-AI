// components/ChatInput.tsx - Поле ввода (GLASSMORPHISM)

import { useState } from 'react';
import { SendIcon } from './icons/SendIcon';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (!inputValue.trim() || disabled) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-5 border-t border-white/10 backdrop-blur-sm bg-white/5">
      <div className="flex gap-3 mb-3">
        <input
          type="text"
          className="flex-1 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          placeholder="Опишите вашу проблему..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
        <button
          onClick={handleSubmit}
          disabled={!inputValue.trim() || disabled}
          className="w-12 h-12 bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center hover:from-white hover:to-white/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-white/90 transition-all flex-shrink-0 shadow-lg border border-white/20"
        >
          <SendIcon className="w-5 h-5 text-gray-800" />
        </button>
      </div>
      
      <div className="text-xs text-gray-400 text-center leading-relaxed">
        AI автоматически определит сложность и при необходимости передаст запрос специалисту
      </div>
    </div>
  );
};
