// components/ChatInput.tsx - Поле ввода сообщения

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
    <div className="p-5 border-t border-dark-tertiary">
      <div className="flex gap-3 mb-3">
        <input
          type="text"
          className="flex-1 bg-dark-tertiary border border-dark-border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Опишите вашу проблему..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
        <button
          onClick={handleSubmit}
          disabled={!inputValue.trim() || disabled}
          className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-gray-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-all flex-shrink-0"
        >
          <SendIcon className="w-5 h-5 text-dark-bg" />
        </button>
      </div>
      
      <div className="text-xs text-gray-500 text-center leading-relaxed">
        AI автоматически определит сложность и при необходимости передаст запрос специалисту
      </div>
    </div>
  );
};
