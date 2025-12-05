// components/Header.tsx - Шапка приложения (GLASSMORPHISM)

import { HomeIcon, ChatIcon, BookIcon, SettingsIcon } from './icons';

interface HeaderProps {
  currentPage: 'chat' | 'knowledge' | 'admin';
  onPageChange: (page: 'chat' | 'knowledge' | 'admin') => void;
}

export const Header = ({ currentPage, onPageChange }: HeaderProps) => {
  return (
    <header className="backdrop-blur-xl bg-white/5 border-b border-white/10 px-4 md:px-8 py-4 relative z-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 backdrop-blur-md bg-white border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
            <HomeIcon className="w-6 h-6 text-gray-800" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">AI Support Matrix</h1>
            <p className="text-sm text-gray-300">Интеллектуальная система поддержки</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-2">
          <button
            onClick={() => onPageChange('chat')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all shadow-lg ${
              currentPage === 'chat'
                ? 'bg-white text-gray-900'
                : 'backdrop-blur-md bg-white/10 border border-white/20 text-gray-300 hover:bg-white/15'
            }`}
          >
            <ChatIcon className="w-5 h-5" />
            <span>Чат с AI</span>
          </button>
          <button
            onClick={() => onPageChange('knowledge')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all shadow-lg ${
              currentPage === 'knowledge'
                ? 'bg-white text-gray-900'
                : 'backdrop-blur-md bg-white/10 border border-white/20 text-gray-300 hover:bg-white/15'
            }`}
          >
            <BookIcon className="w-5 h-5" />
            <span>База знаний</span>
          </button>
          <button
            onClick={() => onPageChange('admin')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all shadow-lg ${
              currentPage === 'admin'
                ? 'bg-white text-gray-900'
                : 'backdrop-blur-md bg-white/10 border border-white/20 text-gray-300 hover:bg-white/15'
            }`}
          >
            <SettingsIcon className="w-5 h-5" />
            <span>Админ</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
