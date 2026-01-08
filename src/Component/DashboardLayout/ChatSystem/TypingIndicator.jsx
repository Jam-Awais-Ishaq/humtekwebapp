const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
        A
      </div>
      <div className="bg-white border px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
        <div className="flex items-center gap-1">
          <div className="text-xs text-blue-600 font-medium">Admin</div>
          <div className="flex gap-1 ml-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-150"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
        <div className="text-gray-600 text-sm mt-1">typing...</div>
      </div>
    </div>
  );
};

export default TypingIndicator;