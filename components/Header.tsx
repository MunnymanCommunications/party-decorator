
import React from 'react';
import { SparklesIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-brand-secondary/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <SparklesIcon className="w-6 h-6 sm:w-8 sm:h-8 text-brand-primary animate-pulse-slow" />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-brand-text-primary tracking-tight">
            Party Room Decorator AI
          </h1>
        </div>
      </div>
    </header>
  );
};
