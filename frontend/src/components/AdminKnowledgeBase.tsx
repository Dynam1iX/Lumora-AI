// components/AdminKnowledgeBase.tsx - Управление базой знаний (вкладка админки)

import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from './icons';

interface Article {
  id: string;
  title: string;
  category: string;
  views: number;
  helpful: number;
  tags: string[];
  content: string;
}

// Mock data
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Решение проблем с Wi-Fi подключением',
    category: 'Интернет',
    views: 2100,
    helpful: 187,
    tags: ['wifi', 'сеть', 'интернет', 'подключение', 'роутер'],
    content: 'Если у вас проблемы с Wi-Fi:',
  },
  {
    id: '2',
    title: 'Установка драйвера принтера',
    category: 'Принтеры',
    views: 890,
    helpful: 124,
    tags: ['принтер', 'драйвер', 'установка', 'печать'],
    content: 'Для установки драйвера принтера:',
  },
];

export const AdminKnowledgeBase = () => {
  const [articles] = useState<Article[]>(mockArticles);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Управление базой знаний
          </h1>
          <p className="text-gray-400">
            Создавайте и редактируйте статьи для помощи пользователям
          </p>
        </div>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-2xl hover:bg-gray-100 transition-all shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          Создать статью
        </button>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Category Badge */}
                <div className="inline-block px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300 mb-3">
                  {article.category}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {article.title}
                </h3>

                {/* Content Preview */}
                <p className="text-gray-400 mb-4">{article.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <span>{article.views} просмотров</span>
                  <span>{article.helpful} полезно</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 ml-4">
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all">
                  <PencilIcon className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-red-900/30 hover:bg-red-900/50 rounded-xl transition-all">
                  <TrashIcon className="w-5 h-5 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no articles) */}
      {articles.length === 0 && (
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-16 text-center shadow-xl">
          <h3 className="text-2xl font-semibold text-white mb-3">
            Нет статей
          </h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Создайте первую статью чтобы помочь пользователям
          </p>
          <button
            onClick={() => setShowCreateDialog(true)}
            className="px-6 py-3 bg-white text-gray-900 rounded-2xl hover:bg-gray-100 transition-all shadow-lg"
          >
            Создать статью
          </button>
        </div>
      )}
    </div>
  );
};
