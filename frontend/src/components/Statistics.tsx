import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, CheckCircle, Zap, Users } from 'lucide-react';

interface Ticket {
  id: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  aiEscalated?: boolean;
  supportLevel?: number;
}

const COLORS = ['#ffffff', '#cccccc', '#999999', '#666666', '#444444'];

export default function Statistics() {
  // TODO: Заменить на реальные данные из backend API
  // 
  // Пример запроса:
  // useEffect(() => {
  //   const fetchStats = async () => {
  //     const response = await fetch('/api/statistics');
  //     const data = await response.json();
  //     setStatistics(data);
  //   };
  //   fetchStats();
  // }, []);
  //
  // Backend должен вернуть:
  // {
  //   totalTickets: number,
  //   aiHandled: number,
  //   humanHandled: number,
  //   aiRate: number,
  //   avgResponseTime: string,
  //   satisfaction: number,
  //   categoryStats: Array<{name: string, value: number}>,
  //   statusStats: Array<{name: string, value: number}>,
  //   activityData: Array<{time: string, active: number}>
  // }

  // ПУСТОЕ СОСТОЯНИЕ - готово для реальных данных
  const totalTickets = 0;
  const aiHandled = 0;
  const humanHandled = 0;
  const aiRate = 0;
  const avgResponseTime = '0 мин';
  const satisfaction = 0;
  
  // Пустые данные для графиков
  const categoryData: Array<{name: string, value: number}> = [];
  const statusData: Array<{name: string, value: number, color: string}> = [];
  const supportLevelData: Array<{name: string, value: number, color: string}> = [];
  const activityData: Array<{time: string, active: number}> = [];

  const activeTickets = 0;
  const resolvedTickets = 0;
  const resolvedRate = 0;

  return (
    <div className="space-y-6 relative mt-8">
      {/* Background Blue Eclipse Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#aee9ff]/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#4ea8ff]/6 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-[#7ec8ff]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        <div className="glass-strong rounded-xl shadow-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-white p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
          </div>
          <p className="text-[#99a1af] text-sm">Всего запросов</p>
          <h3 className="text-white">{totalTickets}</h3>
        </div>

        <div className="glass-strong rounded-xl shadow-2xl border border-orange-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-orange-500 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-[#99a1af] text-sm">Активных</p>
          <h3 className="text-white">{activeTickets}</h3>
        </div>

        <div className="glass-strong rounded-xl shadow-2xl border border-green-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-green-500 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-[#99a1af] text-sm">Решено</p>
          <h3 className="text-white">{resolvedTickets}</h3>
        </div>

        <div className="glass-strong rounded-xl shadow-2xl border border-purple-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-[#99a1af] text-sm">AI автоматизация</p>
          <h3 className="text-white">{aiRate}%</h3>
        </div>
      </div>

      {/* AI vs Human Performance */}
      <div className="glass-strong rounded-xl shadow-2xl border border-white/20 p-6 relative z-10">
        <h3 className="text-white mb-6">Распределение по линиям поддержки</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white p-2 rounded-full">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h4 className="text-white">1-я линия (AI)</h4>
                <p className="text-sm text-[#99a1af]">Автоматическое решение</p>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white">{aiHandled}</p>
                <p className="text-sm text-[#99a1af]">запросов обработано</p>
              </div>
              <div className="text-right">
                <p className="text-white">{aiRate}%</p>
                <p className="text-xs text-[#99a1af]">от общего числа</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-pink-500 p-2 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white">2-я линия (Human)</h4>
                <p className="text-sm text-[#99a1af]">Эскалация специалистам</p>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white">{humanHandled}</p>
                <p className="text-sm text-[#99a1af]">запросов передано</p>
              </div>
              <div className="text-right">
                <p className="text-white">{100 - aiRate}%</p>
                <p className="text-xs text-[#99a1af]">от общего числа</p>
              </div>
            </div>
          </div>
        </div>

        {totalTickets > 0 && (
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={supportLevelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
                <XAxis dataKey="name" stroke="#99a1af" />
                <YAxis stroke="#99a1af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Bar dataKey="value" fill="#ffffff" name="Количество">
                  {supportLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {/* Category Distribution */}
        <div className="glass-strong rounded-xl shadow-2xl border border-white/10 p-6">
          <h3 className="text-white mb-6">Распределение по категориям</h3>
          {totalTickets > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-[#99a1af]">
              Нет данных для отображения
            </div>
          )}
        </div>

        {/* Status Distribution */}
        <div className="glass-strong rounded-xl shadow-2xl border border-white/10 p-6">
          <h3 className="text-white mb-6">Статусы запросов</h3>
          {totalTickets > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
                <XAxis dataKey="name" stroke="#99a1af" />
                <YAxis stroke="#99a1af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Bar dataKey="value" fill="#aee9ff" name="Количество">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-[#99a1af]">
              Нет данных для отображения
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-strong rounded-xl shadow-2xl border border-white/10 p-6 relative z-10">
        <h3 className="text-white mb-4">Последние запросы</h3>
        {tickets.length > 0 ? (
          <div className="space-y-3">
            {tickets
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 5)
              .map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-4 glass rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      ticket.status === 'open' ? 'bg-blue-400 animate-pulse' :
                      ticket.status === 'awaiting_support' ? 'bg-orange-400 animate-pulse' :
                      ticket.status === 'in_progress' ? 'bg-yellow-400' :
                      ticket.status === 'resolved' ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                    <span className="text-white">{ticket.category}</span>
                    {ticket.aiEscalated && (
                      <div className="flex items-center space-x-1 px-2 py-0.5 glass border border-orange-500/30 rounded-full">
                        <Zap className="w-3 h-3 text-orange-400" />
                        <span className="text-xs text-orange-400">L2</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      ticket.priority === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      ticket.priority === 'high' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      ticket.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {ticket.priority === 'critical' ? 'Критичный' :
                       ticket.priority === 'high' ? 'Высокий' :
                       ticket.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </span>
                    <span className="text-sm text-[#99a1af]">
                      {new Date(ticket.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-8 text-[#99a1af]">
            Нет запросов для отображения
          </div>
        )}
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        <div className="glass-strong rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-3">
            <CheckCircle className="w-5 h-5 text-white" />
            <h4 className="text-white">Процент решения</h4>
          </div>
          <p className="text-white">{resolvedRate}%</p>
          <p className="text-sm text-[#99a1af] mt-1">успешно закрытых запросов</p>
        </div>

        <div className="glass-strong rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-3">
            <Zap className="w-5 h-5 text-orange-400" />
            <h4 className="text-white">Эскалация</h4>
          </div>
          <p className="text-white">{humanHandled}</p>
          <p className="text-sm text-[#99a1af] mt-1">запросов передано на L2</p>
        </div>

        <div className="glass-strong rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h4 className="text-white">AI Эффективность</h4>
          </div>
          <p className="text-white">{aiRate}%</p>
          <p className="text-sm text-[#99a1af] mt-1">обработано автоматически</p>
        </div>
      </div>
    </div>
  );
}