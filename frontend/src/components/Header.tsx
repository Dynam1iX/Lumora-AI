// components/Header.tsx - Шапка приложения (как на скрине)

import { HomeIcon, ChatIcon, BookIcon, SettingsIcon } from './icons';

export const Header = () => {
  return (
    <header className="bg-dark-secondary border-b border-dark-tertiary px-4 md:px-8 py-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-dark-tertiary rounded-xl flex items-center justify-center">
            <HomeIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">AI Support Matrix</h1>
            <p className="text-sm text-gray-400">Интеллектуальная система поддержки</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-dark-tertiary border border-dark-border text-white rounded-lg text-sm hover:bg-opacity-80 transition-all">
            <ChatIcon className="w-5 h-5" />
            <span>Чат-бот</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 border border-dark-border text-gray-400 rounded-lg text-sm hover:bg-dark-tertiary hover:text-white transition-all">
            <BookIcon className="w-5 h-5" />
            <span>База знаний</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 border border-dark-border text-gray-400 rounded-lg text-sm hover:bg-dark-tertiary hover:text-white transition-all">
            <SettingsIcon className="w-5 h-5" />
            <span>Админка</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
