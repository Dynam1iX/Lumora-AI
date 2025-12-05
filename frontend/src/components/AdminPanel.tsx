// components/AdminPanel.tsx - Админ-панель со статистикой

import { useState } from 'react';
import { 
  ChartBarIcon, 
  BookOpenIcon, 
  LightningIcon, 
  UsersIcon,
  TrendUpIcon,
  ClockIcon,
  HeartIcon 
} from './icons';
import { SolarSystemBackground } from './SolarSystemGauge';
import { AdminKnowledgeBase } from './AdminKnowledgeBase';

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'statistics' | 'knowledge'>('statistics');
  
  // Mock data (позже будет из API)
  const aiHandled = 0;
  const humanHandled = 0;
  const totalTickets = aiHandled + humanHandled;
  const aiRate = totalTickets > 0 ? Math.round((aiHandled / totalTickets) * 100) : 0;

  return (
    <div className="flex-1 p-8 overflow-y-auto relative">
      {/* Solar System Background */}
      <SolarSystemBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Tabs */}
        <div className="flex gap-3 mb-8 animate-scaleIn">
          <button
            onClick={() => setActiveTab('statistics')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all shadow-lg hover:scale-105 ${
              activeTab === 'statistics'
                ? 'bg-white text-gray-900'
                : 'backdrop-blur-md bg-white/10 border border-white/20 text-gray-300 hover:bg-white/15'
            }`}
          >
            <ChartBarIcon className="w-5 h-5" />
            Статистика
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all shadow-lg hover:scale-105 ${
              activeTab === 'knowledge'
                ? 'bg-white text-gray-900'
                : 'backdrop-blur-md bg-white/10 border border-white/20 text-gray-300 hover:bg-white/15'
            }`}
          >
            <BookOpenIcon className="w-5 h-5" />
            База знаний
          </button>
        </div>

        {activeTab === 'statistics' ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Распределение по линиям поддержки
              </h1>
              <p className="text-gray-400">Мониторинг автоматизации и эскалации запросов</p>
            </div>

            {/* Main Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Automatic Resolution Card */}
              <div 
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl hover:scale-102 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all"
                style={{
                  animation: 'scaleIn 0.6s ease-out'
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-4">
                      <LightningIcon className="w-7 h-7 text-white animate-pulse" />
                    </div>
                    <h3 className="text-lg text-gray-400 mb-1">Автоматическое решение</h3>
                    <p className="text-5xl font-bold text-white">{aiHandled}</p>
                    <p className="text-sm text-gray-500 mt-2">запросов обработано</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">от общего числа</p>
                    <p className="text-2xl font-semibold text-white">{aiRate}%</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400">0 решено AI</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-white transition-all" style={{ width: `${aiRate}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-400">0%</span>
                  </div>
                </div>
              </div>

              {/* Escalation Card */}
              <div 
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl hover:scale-102 hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] transition-all"
                style={{
                  animation: 'scaleIn 0.6s ease-out 0.1s backwards'
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                      <UsersIcon className="w-7 h-7 text-white animate-glow" />
                    </div>
                    <h3 className="text-lg text-gray-400 mb-1">Эскалация специалистам</h3>
                    <p className="text-5xl font-bold text-white">{humanHandled}</p>
                    <p className="text-sm text-gray-500 mt-2">запросов передано</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">от общего числа</p>
                    <p className="text-2xl font-semibold text-white">{100 - aiRate}%</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400">0 передано специалистам</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all" style={{ width: `${100 - aiRate}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-400">0%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Requests */}
              <div 
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-105 transition-all"
                style={{
                  animation: 'slideUp 0.6s ease-out 0.2s backwards'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <ChartBarIcon className="w-6 h-6 text-gray-400" />
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <TrendUpIcon className="w-4 h-4 animate-pulse" />
                    <span>—</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-2">Всего запросов</p>
                <p className="text-4xl font-bold text-white">0</p>
              </div>

              {/* Average Response Time */}
              <div 
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-105 transition-all"
                style={{
                  animation: 'slideUp 0.6s ease-out 0.3s backwards'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <ClockIcon className="w-6 h-6 text-gray-400" />
                  <div className="flex items-center gap-1 text-red-400 text-sm">
                    <span>-12%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-2">Среднее время ответа</p>
                <p className="text-4xl font-bold text-white">2.3 мин</p>
              </div>

              {/* Satisfaction */}
              <div 
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-105 transition-all"
                style={{
                  animation: 'slideUp 0.6s ease-out 0.4s backwards'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <HeartIcon className="w-6 h-6 text-gray-400" />
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <TrendUpIcon className="w-4 h-4 animate-pulse" />
                    <span>+8%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-2">Удовлетворенность</p>
                <p className="text-4xl font-bold text-white">94%</p>
              </div>
            </div>

            {/* Activity Chart */}
            <div 
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl"
              style={{
                animation: 'fadeIn 0.8s ease-out 0.5s backwards'
              }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                Активность в реальном времени
              </h3>
              <div className="h-48 flex items-center justify-center">
                <p className="text-gray-400">Нет активности</p>
              </div>
            </div>
          </>
        ) : (
          <AdminKnowledgeBase />
        )}
      </div>
    </div>
  );
};
