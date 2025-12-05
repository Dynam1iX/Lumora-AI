// App.tsx - Главный компонент приложения

import { Header } from './components/Header';
import { ChatBot } from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Header />
      <ChatBot />
    </div>
  );
}

export default App;
