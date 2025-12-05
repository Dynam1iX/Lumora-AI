// components/ChatInput.tsx - Поле ввода (темное)

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
    <div className="p-4 border-t border-[#2d3748] bg-[#1a1f2e]">
      <div className="flex gap-3 mb-2">
        <input
          type="text"
          className="flex-1 bg-[#2a3140] border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Опишите вашу проблему..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
        <button
          onClick={handleSubmit}
          disabled={!inputValue.trim() || disabled}
          className="w-11 h-11 bg-white rounded-xl flex items-center justify-center hover:bg-gray-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-all flex-shrink-0"
        >
          <SendIcon className="w-5 h-5 text-gray-800" />
        </button>
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        AI автоматически определит сложность и при необходимости передаст запрос специалисту
      </div>
    </div>
  );
};
