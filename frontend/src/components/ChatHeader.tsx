// components/ChatHeader.tsx - Заголовок чата

export const ChatHeader = () => {
  return (
    <div className="px-6 py-5 border-b border-dark-tertiary flex justify-between items-center">
      <h2 className="text-lg font-semibold">AI Support Bot</h2>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>Онлайн</span>
      </div>
    </div>
  );
};
