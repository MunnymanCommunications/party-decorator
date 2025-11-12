
import React from 'react';
import { SparklesIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-surface/50 backdrop-blur-sm sticky top-0 z-10 border-b border-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
        <div className="flex items-center gap-3">
          <SparklesIcon className="w-8 h-8 text-brand-primary" />
          <h1 className="text-2xl font-bold text-brand-text-primary tracking-tight">
            Party Room Decorator AI
          </h1>
        </div>
      </div>
    </header>
  );
};
