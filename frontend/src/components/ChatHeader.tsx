// components/ChatHeader.tsx - Заголовок чата (GLASSMORPHISM)

export const ChatHeader = () => {
  return (
    <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center backdrop-blur-sm bg-white/5">
      <h2 className="text-lg font-semibold text-white">AI Support Bot</h2>
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <div className="relative">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        </div>
        <span>Онлайн</span>
      </div>
    </div>
  );
};
