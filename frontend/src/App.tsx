import { useState } from 'react';
import { Settings, BookOpen, MessageSquare, Bot } from 'lucide-react';
import ChatWindow from './components/ChatWindow';
import KnowledgeBase from './components/KnowledgeBase';
import AdminPanel from './components/AdminPanel';

type View = 'chat' | 'knowledge' | 'admin';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('chat');

  const renderContent = () => {
    switch (currentView) {
      case 'chat':
        return <ChatWindow />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'admin':
        return <AdminPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* НОВАЯ ПРОСТАЯ АНИМАЦИЯ - Вращающаяся конструкция со сферами */}
      {/* На мобильных - упрощенная версия, на десктопе - полная */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        
        {/* ГЛАВНАЯ ВРАЩАЮЩАЯСЯ КОНСТРУКЦИЯ */}
        <div className="absolute w-full h-full animate-[mainRotate_40s_linear_infinite]">
          
          {/* Центральная длинная ось (вертикальный стержень) - только на десктопе */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div 
              className="w-2 bg-gradient-to-b from-transparent via-white to-transparent rounded-full blur-sm"
              style={{
                height: '800px',
                opacity: 0.3,
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3)',
              }}
            />
          </div>

          {/* Большие сферы на орбитах (на мобильных только 4, на десктопе все 8) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <div
              key={`orbit-sphere-${i}`}
              className={`absolute top-1/2 left-1/2 ${i >= 4 ? 'hidden md:block' : ''}`}
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-250px)`,
              }}
            >
              <div
                className="w-16 h-16 bg-white rounded-full blur-md animate-[sphereFloat_4s_ease-in-out_infinite]"
                style={{
                  opacity: 0.4,
                  boxShadow: '0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.3)',
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            </div>
          ))}

          {/* Средние сферы на ближних орбитах - только на десктопе */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <div
              key={`mid-sphere-${i}`}
              className="hidden md:block absolute top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-150px)`,
              }}
            >
              <div
                className="w-10 h-10 bg-white rounded-full blur-md animate-[sphereFloat_3s_ease-in-out_infinite]"
                style={{
                  opacity: 0.5,
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.7)',
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            </div>
          ))}

          {/* Соединительные кольца (на мобильных только 1, на десктопе все 3) */}
          {[200, 280, 360].map((radius, i) => (
            <div
              key={`ring-${i}`}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white animate-[ringPulse_3s_ease-in-out_infinite] ${i > 0 ? 'hidden md:block' : ''}`}
              style={{
                width: `${radius}px`,
                height: `${radius}px`,
                opacity: 0.15,
                boxShadow: `0 0 20px rgba(255, 255, 255, 0.3)`,
                animationDelay: `${i * 1}s`,
              }}
            />
          ))}

          {/* Орбитальные линии (спирали вокруг оси) - только на десктопе */}
          {[0, 120, 240].map((rotation, i) => (
            <div
              key={`spiral-${i}`}
              className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '500px',
                height: '500px',
                transform: `translate(-50%, -50%) rotateX(60deg) rotateZ(${rotation}deg)`,
              }}
            >
              <div
                className="w-full h-full rounded-full border-2 border-white animate-[spiralMove_6s_linear_infinite]"
                style={{
                  opacity: 0.2,
                  borderStyle: 'dashed',
                  borderSpacing: '10px',
                  animationDelay: `${i * 2}s`,
                }}
              />
            </div>
          ))}

        </div>

        {/* ВТОРИЧНАЯ КОНСТРУКЦИЯ - медленное вращение в обратную сторону - только на десктопе */}
        <div className="hidden md:block absolute w-full h-full animate-[mainRotateReverse_60s_linear_infinite]">
          
          {/* Малые сферы на внешних орбитах (12 штук) */}
          {[...Array(12)].map((_, i) => {
            const angle = (360 / 12) * i;
            return (
              <div
                key={`outer-sphere-${i}`}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-350px)`,
                }}
              >
                <div
                  className="w-6 h-6 bg-white rounded-full blur-sm animate-[twinkle_2s_ease-in-out_infinite]"
                  style={{
                    opacity: 0.3,
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              </div>
            );
          })}

          {/* Горизонтальная длинная ось */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div 
              className="h-2 bg-gradient-to-r from-transparent via-white to-transparent rounded-full blur-sm"
              style={{
                width: '700px',
                opacity: 0.25,
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
              }}
            />
          </div>

        </div>

        {/* Центральная светящаяся сфера */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 bg-white rounded-full blur-2xl opacity-30 animate-[corePulse_4s_ease-in-out_infinite]" 
            style={{
              boxShadow: '0 0 60px rgba(255, 255, 255, 0.6), 0 0 120px rgba(255, 255, 255, 0.4)',
            }}
          />
        </div>

        {/* Тонкое свечение по краям экрана */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent"></div>

      </div>

      {/* Top Header Bar with animations */}
      <header className="relative z-20 border border-white/10 bg-white/5 backdrop-blur-xl animate-[slideDown_0.6s_ease-out]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 gap-6">
            {/* Logo and Title with glow animation */}
            <div className="flex items-center space-x-10 animate-[fadeIn_0.8s_ease-out]">
              <div className="bg-white rounded-2xl p-3 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-110 animate-[glow_2s_ease-in-out_infinite]">
                <Bot className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-white text-lg sm:text-xl hover:text-white/90 transition-colors">AI Support Matrix</h1>
                <p className="text-white/50 text-xs sm:text-sm">Интеллектуальная система поддержки</p>
              </div>
            </div>

            {/* Navigation Pills with enhanced animations */}
            <nav className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
              <button
                onClick={() => setCurrentView('chat')}
                className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 animate-[fadeIn_0.8s_ease-out] ${
                  currentView === 'chat'
                    ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.4)] scale-105'
                    : 'bg-white/5 backdrop-blur-md text-white/70 hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105'
                }`}
                style={{ animationDelay: '0.1s' }}
              >
                <MessageSquare className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>Чат с AI</span>
              </button>
              <button
                onClick={() => setCurrentView('knowledge')}
                className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 animate-[fadeIn_0.8s_ease-out] ${
                  currentView === 'knowledge'
                    ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.4)] scale-105'
                    : 'bg-white/5 backdrop-blur-md text-white/70 hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105'
                }`}
                style={{ animationDelay: '0.2s' }}
              >
                <BookOpen className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>База знаний</span>
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 animate-[fadeIn_0.8s_ease-out] ${
                  currentView === 'admin'
                    ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.4)] scale-105'
                    : 'bg-white/5 backdrop-blur-md text-white/70 hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105'
                }`}
                style={{ animationDelay: '0.3s' }}
              >
                <Settings className="w-5 h-5 transition-transform group-hover:rotate-90" />
                <span>Админ</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content with fade animation */}
      <main className="relative z-10 px-6 sm:px-8 py-8 animate-[fadeIn_1s_ease-out]" style={{ animationDelay: '0.4s' }}>
        {renderContent()}
      </main>
    </div>
  );
}