import { useState, useEffect } from 'react';
import { Search, BookOpen, ExternalLink, ThumbsUp, ArrowRight, Eye } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  views: number;
  helpful: number;
}

export default function KnowledgeBase() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    loadArticles();
    
    // Listen for changes in localStorage
    const handleStorageChange = () => {
      loadArticles();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event when articles are updated in the same tab
    const handleArticlesUpdate = () => {
      loadArticles();
    };
    
    window.addEventListener('articlesUpdated', handleArticlesUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('articlesUpdated', handleArticlesUpdate);
    };
  }, []);

  const loadArticles = () => {
    const stored = localStorage.getItem('knowledgeBaseArticles');
    if (stored) {
      setArticles(JSON.parse(stored));
    }
  };
  
  const categories = ['Интернет', 'Принтеры', 'Приложения', 'Доступ', 'Техника'];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleHelpful = (articleId: string) => {
    const updated = articles.map((article) =>
      article.id === articleId ? { ...article, helpful: article.helpful + 1 } : article
    );
    setArticles(updated);
    localStorage.setItem('knowledgeBaseArticles', JSON.stringify(updated));
    window.dispatchEvent(new Event('articlesUpdated'));
    setHasVoted(true);
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setHasVoted(false); // Сброс при открытии новой статьи
    const updated = articles.map((a) =>
      a.id === article.id ? { ...a, views: a.views + 1 } : a
    );
    setArticles(updated);
    localStorage.setItem('knowledgeBaseArticles', JSON.stringify(updated));
    window.dispatchEvent(new Event('articlesUpdated'));
  };

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-white hover:text-white/70 mb-6 transition-colors"
          >
            ← Вернуться к поиску
          </button>

          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-white/5 rounded-full text-sm mb-3 border border-white/10">
              <span className="text-white">{selectedArticle.category}</span>
            </div>
            <h2 className="text-white mb-4 text-2xl">{selectedArticle.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-white/50">
              <span>{selectedArticle.views} просмотров</span>
              <span>•</span>
              <span>{selectedArticle.helpful} нашли полезным</span>
            </div>
          </div>

          <div className="bg-[#2a2a2a] rounded-2xl p-6 border border-white/5 mb-6">
            <p className="whitespace-pre-line text-white/90 leading-relaxed">{selectedArticle.content}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {selectedArticle.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/70 border border-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="pt-6 border-t border-white/5">
            <p className="text-white mb-4">Была ли эта статья полезной?</p>
            <button
              onClick={() => handleHelpful(selectedArticle.id)}
              className="flex items-center space-x-3 px-8 py-4 bg-[#1a4d2e] rounded-full hover:bg-[#235d3a] transition-all duration-300 border-2 border-[#2ecc71] text-[#2ecc71] shadow-[0_0_20px_rgba(46,204,113,0.3)] hover:shadow-[0_0_30px_rgba(46,204,113,0.5)]"
            >
              <ThumbsUp className="w-5 h-5" />
              <span>Да, помогло</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {!selectedArticle ? (
        <>
          {/* Search Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-4 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white/50" />
                <input
                  type="text"
                  placeholder="Поиск по статьям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none text-sm sm:text-base"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-sm transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  Все
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article)}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="px-2 sm:px-3 py-1 bg-white/5 rounded-full text-xs sm:text-sm text-white/70 border border-white/10">
                    {article.category}
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <h3 className="text-white mb-2 sm:mb-3 text-base sm:text-lg">{article.title}</h3>
                
                <p className="text-white/50 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  {article.content.split('\n')[0]}
                </p>

                <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-white/40">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{article.helpful}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/5 text-white/60 rounded text-xs border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="bg-[#202020] rounded-3xl shadow-2xl p-12 text-center border border-white/5">
              <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-white mb-2">Ничего не найдено</h3>
              <p className="text-white/50">Попробуйте изменить поисковой запрос или категорию</p>
            </div>
          )}
        </>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#202020] rounded-3xl shadow-2xl border border-white/5 p-8">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-white hover:text-white/70 mb-6 transition-colors"
            >
              ← Вернуться к поиску
            </button>

            <div className="mb-6">
              <div className="inline-block px-4 py-2 bg-white/5 rounded-full text-sm mb-3 border border-white/10">
                <span className="text-white">{selectedArticle.category}</span>
              </div>
              <h2 className="text-white mb-4 text-2xl">{selectedArticle.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-white/50">
                <span>{selectedArticle.views} просмотров</span>
                <span>•</span>
                <span>{selectedArticle.helpful} нашли полезным</span>
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-2xl p-6 border border-white/5 mb-6">
              <p className="whitespace-pre-line text-white/90 leading-relaxed">{selectedArticle.content}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/70 border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5">
              <p className="text-white mb-4">Была ли эта статья полезной?</p>
              <button
                onClick={() => handleHelpful(selectedArticle.id)}
                className="flex items-center space-x-3 px-8 py-4 bg-[#1a4d2e] rounded-full hover:bg-[#235d3a] transition-all duration-300 border-2 border-[#2ecc71] text-[#2ecc71] shadow-[0_0_20px_rgba(46,204,113,0.3)] hover:shadow-[0_0_30px_rgba(46,204,113,0.5)]"
              >
                <ThumbsUp className="w-5 h-5" />
                <span>Да, помогло</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}