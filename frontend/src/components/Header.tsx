// components/Header.tsx - Шапка приложения (GLASSMORPHISM)

import { HomeIcon, ChatIcon, BookIcon, SettingsIcon } from './icons';

export const Header = () => {
  return (
    <header className="backdrop-blur-xl bg-white/5 border-b border-white/10 px-4 md:px-8 py-4 relative z-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl flex items-center justify-center shadow-lg">
            <HomeIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">AI Support Matrix</h1>
            <p className="text-sm text-gray-300">Интеллектуальная система поддержки</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-5 py-2.5 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-xl text-sm hover:bg-white/15 transition-all shadow-lg">
            <ChatIcon className="w-5 h-5" />
            <span>Чат-бот</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 border border-white/10 text-gray-300 rounded-xl text-sm hover:backdrop-blur-md hover:bg-white/10 hover:text-white transition-all">
            <BookIcon className="w-5 h-5" />
            <span>База знаний</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 border border-white/10 text-gray-300 rounded-xl text-sm hover:backdrop-blur-md hover:bg-white/10 hover:text-white transition-all">
            <SettingsIcon className="w-5 h-5" />
            <span>Админка</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
