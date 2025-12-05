// App.tsx - Главный компонент приложения

import { useState } from 'react';
import { Header } from './components/Header';
import { ChatBot } from './components/ChatBot';
import { KnowledgeBase } from './components/KnowledgeBase';
import { AdminPanel } from './components/AdminPanel';

type Page = 'chat' | 'knowledge' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('chat');

  const renderPage = () => {
    switch (currentPage) {
      case 'chat':
        return <ChatBot />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <ChatBot />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1421] to-[#0a0e1a] relative overflow-hidden flex flex-col">
      {/* Animated Background Lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large glowing orb - top right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        
        {/* Medium glowing orb - bottom left */}
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Small glowing orb - center */}
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-glow"></div>
        
        {/* Additional accent lights */}
        <div className="absolute top-20 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-pink-500/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header currentPage={currentPage} onPageChange={setCurrentPage} />
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
