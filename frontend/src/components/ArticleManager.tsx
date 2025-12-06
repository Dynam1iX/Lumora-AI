import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  views: number;
  helpful: number;
}

export default function ArticleManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    tags: '',
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const stored = localStorage.getItem('knowledgeBaseArticles');
    if (stored) {
      setArticles(JSON.parse(stored));
    } else {
      // Load default articles
      const defaultArticles: Article[] = [
        {
          id: '1',
          title: 'Решение проблем с Wi-Fi подключением',
          category: 'Интернет',
          content: 'Если у вас проблемы с Wi-Fi:\n\nБыстрое решение:\n1. Перезагрузите роутер (выключите на 30 секунд)\n2. Забудьте сеть и подключитесь заново\n3. Обновите драйвера сетевого адаптера\n4. Проверьте, не отключен ли Wi-Fi адаптер (обычно Fn+F2)\n\nКоманды Windows:\n• ipconfig /release\n• ipconfig /renew\n• ipconfig /flushdns\n\n5. Запустите средство устранения неполадок Windows',
          tags: ['wifi', 'сеть', 'интернет', 'подключение', 'роутер'],
          views: 2100,
          helpful: 187,
        },
        {
          id: '2',
          title: 'Установка драйвера принтера',
          category: 'Принтеры',
          content: 'Для установки драйвера принтера:\n\nШаг 1: Получение драйвера\n1. Скачайте драйвер с официального сайта производителя\n2. Или используйте диск из комплекта\n\nШаг 2: Установка\n1. Откройте "Параметры" → "Устройства" → "Принтеры и сканеры"\n2. Нажмите "Добавить принтер или сканер"\n3. Если принтер не найден - "Необходимый принтер отсутствует в списке"\n4. Выберите способ добавления\n5. Укажите путь к драйверу\n6. Следуйте инструкциям мастера\n\nТест:\n• Напечатайте тестовую страницу для проверки',
          tags: ['принтер', 'драйвер', 'установка', 'печать'],
          views: 890,
          helpful: 124,
        },
        {
          id: '3',
          title: 'Сброс пароля учетной записи',
          category: 'Доступ',
          content: 'Для сброса пароля учетной записи:\n\n1. Перейдите на портал самообслуживания: https://account.company.com\n2. Нажмите "Забыли пароль?"\n3. Введите ваш корпоративный email\n4. Подтвердите личность одним из способов:\n   - SMS на зарегистрированный номер\n   - Email на резервную почту\n   - Через приложение Microsoft Authenticator\n5. Создайте новый пароль\n\nТребования к паролю:\n• Минимум 12 символов\n• Заглавные и строчные буквы\n• Цифры\n• Специальные символы\n\nЕсли не можете восстановить доступ - обратитесь в IT службу.',
          tags: ['пароль', 'доступ', 'учетная запись', 'сброс', 'безопасность'],
          views: 1520,
          helpful: 203,
        },
        {
          id: '4',
          title: 'Установка Microsoft Office',
          category: 'Приложения',
          content: 'Процесс установки Microsoft Office:\n\nОнлайн установка:\n1. Перейдите на office.com\n2. Войдите с корпоративной учетной записью\n3. Нажмите "Установить Office"\n4. Скачайте установщик (Setup.exe)\n5. Запустите файл\n6. Дождитесь завершения установки\n7. Откройте любое приложение Office\n8. Войдите для активации\n\nАктивация:\n• Office активируется автоматически при входе\n• Если требуется ключ - обратитесь в IT отдел\n\nДля получения корпоративной лицензии обратитесь в IT отдел.',
          tags: ['office', 'установка', 'программа', 'microsoft', 'приложения'],
          views: 1820,
          helpful: 156,
        },
        {
          id: '5',
          title: 'Устранение зависания компьютера',
          category: 'Техника',
          content: 'Если компьютер зависает:\n\nЭкспресс диагностика:\n1. Проверьте температуру (HWMonitor)\n2. Откройте Диспетчер задач (Ctrl+Shift+Esc)\n3. Проверьте загрузку CPU, RAM, диска\n\nОсновные причины:\n• Перегрев - почистите систему охлаждения\n• Нехватка RAM - закройте лишние программы\n• Высокая загрузка диска - проверьте антивирус\n• Устаревшие драйвера - обновите через Device Manager\n\nГлубокая проверка:\n1. Запустите sfc /scannow в командной строке\n2. Проверьте диск: chkdsk /f /r\n3. Обновите все драйвера\n4. Проверьте на вирусы\n\nЕсли проблема сохраняется - обратитесь в IT поддержку.',
          tags: ['зависание', 'производительность', 'компьютер', 'оптимизация'],
          views: 1340,
          helpful: 142,
        },
      ];
      localStorage.setItem('knowledgeBaseArticles', JSON.stringify(defaultArticles));
      setArticles(defaultArticles);
    }
  };

  const saveArticles = (newArticles: Article[]) => {
    localStorage.setItem('knowledgeBaseArticles', JSON.stringify(newArticles));
    setArticles(newArticles);
    window.dispatchEvent(new Event('articlesUpdated'));
  };

  const handleCreate = () => {
    if (!formData.title || !formData.category || !formData.content) {
      alert('Заполните все обязательные поля');
      return;
    }

    const newArticle: Article = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      content: formData.content,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      views: 0,
      helpful: 0,
    };

    saveArticles([...articles, newArticle]);
    resetForm();
    setIsCreating(false);
  };

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      category: article.category,
      content: article.content,
      tags: article.tags.join(', '),
    });
  };

  const handleUpdate = () => {
    if (!editingId) return;

    const updatedArticles = articles.map(article => {
      if (article.id === editingId) {
        return {
          ...article,
          title: formData.title,
          category: formData.category,
          content: formData.content,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        };
      }
      return article;
    });

    saveArticles(updatedArticles);
    resetForm();
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    saveArticles(articles.filter(article => article.id !== id));
    setArticleToDelete(null);
  };

  const resetForm = () => {
    setFormData({ title: '', category: '', content: '', tags: '' });
  };

  const categories = ['Интернет', 'Принтеры', 'Приложения', 'Доступ', 'Техника'];

  return (
    <div>
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-white text-xl sm:text-2xl mb-2">Управление базой знаний</h2>
          <p className="text-white/50 text-sm sm:text-base">Создавайте и редактируйте статьи для помощи пользователям</p>
        </div>
        {!isCreating && !editingId && (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-black px-6 py-3 rounded-2xl hover:bg-white/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Создать статью</span>
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-8">
          <h3 className="text-white mb-6">{editingId ? 'Редактировать статью' : 'Новая статья'}</h3>
          
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="text-white/70 text-sm mb-2 block">Заголовок *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Например: Решение проблем с принтером"
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-white/30"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-white/70 text-sm mb-2 block">Категория *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/20 text-white"
              >
                <option value="">Выберите категорию</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Content */}
            <div>
              <label className="text-white/70 text-sm mb-2 block">Содержание *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Подробная инструкция для решения проблемы..."
                rows={10}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-white/30 resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="text-white/70 text-sm mb-2 block">Теги (через запятую)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="принтер, драйвер, установка"
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-white/30"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={editingId ? handleUpdate : handleCreate}
                className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-2xl hover:bg-white/90 transition-all duration-300"
              >
                <Save className="w-5 h-5" />
                <span>{editingId ? 'Сохранить' : 'Создать'}</span>
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingId(null);
                  resetForm();
                }}
                className="flex items-center space-x-2 bg-white/5 text-white px-6 py-3 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <X className="w-5 h-5" />
                <span>Отмена</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.01]">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/70 border border-white/10">
                    {article.category}
                  </span>
                  <span className="text-white/40 text-sm">{article.views} просмотров</span>
                  <span className="text-white/40 text-sm">{article.helpful} полезно</span>
                </div>
                <h3 className="text-white mb-2">{article.title}</h3>
                <p className="text-white/50 text-sm line-clamp-2 mb-3">
                  {article.content.split('\n')[0]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/5 text-white/60 rounded text-xs border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {!isCreating && !editingId && (
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(article)}
                    className="p-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setArticleToDelete(article.id)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300 border border-red-500/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10">
          <Plus className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-white mb-2">Статей пока нет</h3>
          <p className="text-white/50 mb-6">Создайте первую статью для базы знаний</p>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-white text-black px-6 py-3 rounded-2xl hover:bg-white/90 transition-all duration-300 inline-flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Создать статью</span>
          </button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {articleToDelete && (
        <ConfirmDialog
          title="Подтвердите удаление"
          message="Вы уверены, что хотите удалить эту статью? Это действие нельзя отменить."
          onConfirm={() => handleDelete(articleToDelete)}
          onCancel={() => setArticleToDelete(null)}
        />
      )}
    </div>
  );
}