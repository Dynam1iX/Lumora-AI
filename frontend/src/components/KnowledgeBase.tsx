// components/KnowledgeBase.tsx - Страница базы знаний

import { useState } from 'react';
import { SearchIcon, BookOpenIcon } from './icons';

const categories = [
  'Все категории',
  'Интернет',
  'Принтеры',
  'Приложения',
  'Доступ',
  'Техника',
];

export const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все категории');

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        {/* Title with Icon */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpenIcon className="w-8 h-8 text-gray-800" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">База знаний</h1>
            <p className="text-gray-400 mt-1">Найдите решение вашей проблемы</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по базе знаний..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all shadow-lg"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all shadow-lg ${
                activeCategory === category
                  ? 'bg-white text-gray-900'
                  : 'backdrop-blur-md bg-white/10 border border-white/20 text-gray-300 hover:bg-white/15'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Empty State */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-16 text-center shadow-xl">
          <BookOpenIcon className="w-20 h-20 text-gray-500 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-3">Ничего не найдено</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Попробуйте изменить поисковой запрос или категорию
          </p>
        </div>
      </div>
    </div>
  );
};
