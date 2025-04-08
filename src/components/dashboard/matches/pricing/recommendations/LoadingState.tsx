
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-tazkara-green rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">جاري تحليل البيانات...</p>
    </div>
  );
};

export default LoadingState;
