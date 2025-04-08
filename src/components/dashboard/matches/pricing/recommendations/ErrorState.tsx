
import React from 'react';

interface ErrorStateProps {
  error: string | null;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <p className="text-red-500">{error}</p>
    </div>
  );
};

export default ErrorState;
