// components/ChatHeader.tsx - Заголовок чата (темный)

export const ChatHeader = () => {
  return (
    <div className="px-6 py-4 border-b border-[#2d3748] flex justify-between items-center bg-[#1a1f2e]">
      <div>
        <h2 className="text-base font-semibold text-white">AI Support Bot</h2>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <div className="relative">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        </div>
        <span>Онлайн</span>
      </div>
    </div>
  );
};
