import { useState } from 'react';
import { Plus, Check } from 'lucide-react';

export default function AddSolution() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Интернет',
    content: '',
    tags: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existingArticles = JSON.parse(localStorage.getItem('knowledgeBase') || '[]');

    const newArticle = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      content: formData.content,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
      views: 0,
      helpful: 0,
    };

    localStorage.setItem('knowledgeBase', JSON.stringify([...existingArticles, newArticle]));

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: '',
        category: 'Интернет',
        content: '',
        tags: '',
      });
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="glass-strong rounded-2xl shadow-2xl border border-white/10 p-12 text-center relative z-10 mt-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full mb-4">
          <Check className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-white mb-2">Решение добавлено!</h3>
        <p className="text-[#99a1af]">Статья успешно добавлена в базу знаний</p>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-2xl shadow-2xl border border-white/10 p-8 max-w-3xl mx-auto mt-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-white p-3 rounded-lg">
          <Plus className="w-8 h-8 text-black" />
        </div>
        <div>
          <h3 className="text-white">Добавить статью</h3>
          <p className="text-[#99a1af]">Создайте новую статью в базе знаний</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm text-white mb-2">
            Заголовок статьи <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Например: Как настроить принтер в Windows"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-[#4a5565]"
          />
        </div>

        <div>
          <label className="text-white mb-2 block">Категория</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white"
          >
            <option value="Интернет">Интернет</option>
            <option value="Принтеры">Принтеры</option>
            <option value="Приложения">Приложения</option>
            <option value="Доступ">Доступ</option>
            <option value="Техника">Техника</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-white mb-2">
            Содержание статьи <span className="text-red-400">*</span>
          </label>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Опишите решение проблемы пошагово..."
            rows={12}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-[#4a5565]"
          />
          <p className="text-sm text-[#99a1af] mt-2">
            Совет: Используйте нумерованные списки для пошаговых инструкций
          </p>
        </div>

        <div>
          <label className="block text-sm text-white mb-2">
            Теги (через запятую) <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="принтер, драйвер, установка"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-[#4a5565]"
          />
          <p className="text-sm text-[#99a1af] mt-2">
            Теги помогут пользователям найти статью через поиск
          </p>
        </div>

        <div className="glass rounded-xl p-4 border border-white/10">
          <h4 className="text-white mb-2">Советы по написанию статей</h4>
          <ul className="text-sm text-[#99a1af] space-y-1">
            <li>• Используйте простой и понятный язык</li>
            <li>• Разбивайте инструкции на пронумерованные шаги</li>
            <li>• Указывайте конкретные названия программ и меню</li>
            <li>• Добавляйте предупреждения о возможных проблемах</li>
          </ul>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-white text-black py-3 rounded-lg hover:bg-white/90 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Добавить в базу знаний</span>
          </button>
        </div>
      </form>
    </div>
  );
}