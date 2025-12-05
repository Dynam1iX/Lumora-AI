// components/Header.tsx - Главный хедер с навигацией (EPIC ANIMATIONS 🎯)

import { HomeIcon, ChatIcon, BookIcon, SettingsIcon } from './icons';

interface HeaderProps {
  currentPage: 'chat' | 'knowledge' | 'admin';
  onPageChange: (page: 'chat' | 'knowledge' | 'admin') => void;
}

export const Header = ({ currentPage, onPageChange }: HeaderProps) => {
  return (
    <header className="p-6 backdrop-blur-md bg-white/5 border-b border-white/10 animate-slideDown">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo с пульсирующим свечением */}
        <div className="flex items-center gap-4 group cursor-pointer hover:scale-110 transition-transform">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-glow hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]">
            <HomeIcon className="w-8 h-8 text-gray-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Support Matrix</h1>
            <p className="text-sm text-gray-400">Интеллектуальная система поддержки</p>
          </div>
        </div>

        {/* Navigation Buttons - с последовательным появлением */}
        <nav className="flex gap-3">
          <button
            onClick={() => onPageChange('chat')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all shadow-lg hover:scale-105 group ${
              currentPage === 'chat'
                ? 'bg-white text-gray-900 shadow-[0_0_30px_rgba(255,255,255,0.4)] scale-105'
                : 'backdrop-blur-md bg-white/10 border border-white/20 text-gray-300 hover:bg-white/15'
            }`}
            style={{
              animation: 'scaleIn 0.5s ease-out 0.1s backwards'
            }}
          >
            <ChatIcon className={`w-5 h-5 transition-transform ${currentPage !== 'chat' ? 'group-hover:rotate-12' : ''}`} />
            Чат с AI
          </button>
          
          <button
            onClick={() => onPageChange('knowledge')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all shadow-lg hover:scale-105 group ${
              currentPage === 'knowledge'
                ? 'bg-white text-gray-900 shadow-[0_0_30px_rgba(255,255,255,0.4)] scale-105'
                : 'backdrop-blur-md bg-white/10 border border-white/20 text-gray-300 hover:bg-white/15'
            }`}
            style={{
              animation: 'scaleIn 0.5s ease-out 0.2s backwards'
            }}
          >
            <BookIcon className={`w-5 h-5 transition-transform ${currentPage !== 'knowledge' ? 'group-hover:rotate-12' : ''}`} />
            База знаний
          </button>
          
          <button
            onClick={() => onPageChange('admin')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all shadow-lg hover:scale-105 group ${
              currentPage === 'admin'
                ? 'bg-white text-gray-900 shadow-[0_0_30px_rgba(255,255,255,0.4)] scale-105'
                : 'backdrop-blur-md bg-white/10 border border-white/20 text-gray-300 hover:bg-white/15'
            }`}
            style={{
              animation: 'scaleIn 0.5s ease-out 0.3s backwards'
            }}
          >
            <SettingsIcon className={`w-5 h-5 transition-transform ${currentPage !== 'admin' ? 'group-hover:rotate-90' : ''}`} />
            Админ
          </button>
        </nav>
      </div>
    </header>
  );
};
