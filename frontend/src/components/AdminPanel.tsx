import { useState, useEffect } from 'react';
import { Zap, Users, BarChart3, TrendingUp, FileText } from 'lucide-react';
import ArticleManager from './ArticleManager';

type AdminTab = 'stats' | 'articles';

export default function AdminPanel() {
  const [currentTab, setCurrentTab] = useState<AdminTab>('stats');
  
  // TODO: Заменить на реальные данные из backend API
  // 
  // Пример:
  // useEffect(() => {
  //   const fetchStats = async () => {
  //     const response = await fetch('/api/admin/statistics');
  //     const data = await response.json();
  //     setStatistics(data);
  //   };
  //   fetchStats();
  // }, []);
  //
  // Backend должен вернуть:
  // {
  //   aiSolved: number,
  //   humanEscalated: number,
  //   totalRequests: number,
  //   avgResponseTime: number,
  //   satisfaction: number,
  //   recentActivity: Array<{time: string, type: string, message: string}>
  // }

  // ПУСТОЕ СОСТОЯНИЕ - готово для реальных данных
  const aiSolved = 0;
  const humanEscalated = 0;
  const totalRequests = 0;
  const avgResponseTime = 0;
  const satisfaction = 0;

  const aiPercentage = totalRequests > 0 ? Math.round((aiSolved / totalRequests) * 100) : 0;
  const humanPercentage = totalRequests > 0 ? Math.round((humanEscalated / totalRequests) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="mb-6 sm:mb-8 bg-white/5 backdrop-blur-xl rounded-3xl p-2 border border-white/10 inline-flex w-full sm:w-auto flex-col sm:flex-row hover:border-white/20 transition-all duration-300 animate-[scaleIn_0.5s_ease-out] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <button
          onClick={() => setCurrentTab('stats')}
          className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 ${
            currentTab === 'stats'
              ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          <BarChart3 className="w-5 h-5 transition-transform hover:scale-110" />
          <span>Статистика</span>
        </button>
        <button
          onClick={() => setCurrentTab('articles')}
          className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 ${
            currentTab === 'articles'
              ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="w-5 h-5 transition-transform hover:scale-110" />
          <span>База знаний</span>
        </button>
      </div>

      {/* Content */}
      {currentTab === 'stats' ? (
        <>
          {/* Title Section */}
          <div className="mb-8">
            <h2 className="text-white text-2xl mb-2">Распределение по линиям поддержки</h2>
            <p className="text-white/50">Мониторинг автоматизации и эскалации запросов</p>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* AI Automatic Resolution Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 animate-[scaleIn_0.6s_ease-out] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-black p-4 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-110">
                  <Zap className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-sm mb-1">Автоматическое решение</p>
                  <p className="text-white text-3xl">{aiSolved}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/50">запросов обработано</span>
                  <span className="text-white/50">от общего числа</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-white h-full transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{ width: `${aiPercentage}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white/70 text-sm">{aiSolved} решено AI</span>
                  <span className="text-white text-sm">{aiPercentage}%</span>
                </div>
              </div>
            </div>

            {/* Human Escalation Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 animate-[scaleIn_0.6s_ease-out] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,100,180,0.1)]" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-4 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300 hover:scale-110 animate-[glow_3s_ease-in-out_infinite]">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-sm mb-1">Эскалация специалистам</p>
                  <p className="text-white text-3xl">{humanEscalated}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/50">запросов пеедано</span>
                  <span className="text-white/50">от общего числа</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-full transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                    style={{ width: `${humanPercentage}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white/70 text-sm">{humanEscalated} передано специалистам</span>
                  <span className="text-white text-sm">{humanPercentage}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Requests */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 animate-[slideUp_0.6s_ease-out] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-6 h-6 text-white/50 transition-transform hover:scale-110" />
                <TrendingUp className="w-5 h-5 text-green-400 animate-pulse" />
              </div>
              <p className="text-white/50 text-sm mb-1">Всего запросов</p>
              <p className="text-white text-2xl">{totalRequests}</p>
            </div>

            {/* Average Response Time */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 animate-[slideUp_0.6s_ease-out] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-6 h-6 text-white/50 transition-transform hover:scale-110 hover:rotate-12" />
              </div>
              <p className="text-white/50 text-sm mb-1">Среднее время ответа</p>
              <p className="text-white text-2xl">{avgResponseTime} мин</p>
            </div>

            {/* Satisfaction Rate */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 animate-[slideUp_0.6s_ease-out] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-4">
                <Users className="w-6 h-6 text-white/50 transition-transform hover:scale-110" />
              </div>
              <p className="text-white/50 text-sm mb-1">Удовлетворенность</p>
              <p className="text-white text-2xl">{satisfaction}%</p>
            </div>
          </div>

          {/* Live Activity Log */}
          <div className="mt-8 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 animate-[fadeIn_0.8s_ease-out] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-white mb-4">Активность в реальном времени</h3>
            <div className="space-y-3">
              <div className="text-center py-8 text-white/40">
                Нет активности
              </div>
            </div>
          </div>
        </>
      ) : (
        <ArticleManager />
      )}
    </div>
  );
}