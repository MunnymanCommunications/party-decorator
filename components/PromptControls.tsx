import React from 'react';
import { WandIcon } from './IconComponents';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isDecorated: boolean;
  imageSelected: boolean;
}

export const PromptControls: React.FC<PromptControlsProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  isLoading,
  isDecorated,
  imageSelected,
}) => {
  const themes = [
    'Christmas',
    'Thanksgiving',
    'Birthday Party',
    'Baby Shower',
    'Engagement Party',
    'Halloween',
    'New Year\'s Eve',
    'Rustic Wedding'
  ];

  return (
    <div className="flex flex-col gap-4 animate-slide-up">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-brand-text-secondary mb-2">
          {isDecorated ? 'Describe your refinements...' : 'Describe the party theme...'}
        </label>
        <textarea
          id="prompt"
          rows={3}
          className="w-full bg-brand-background/50 border-2 border-brand-surface rounded-lg p-3 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-brand-text-primary placeholder-brand-text-secondary/50 resize-none touch-manipulation"
          placeholder={isDecorated ? "e.g., 'Make it more rustic' or 'Add balloons'" : "e.g., 'A spooky Halloween party' or 'A vintage Thanksgiving dinner'"}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-brand-text-secondary">
          Or try a quick theme:
        </p>
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setPrompt(`A festive ${theme.toLowerCase()} theme`)}
              disabled={isLoading}
              className="px-3 py-1.5 text-xs sm:text-sm border-2 border-brand-surface rounded-full text-brand-text-secondary bg-brand-surface hover:bg-brand-primary/10 hover:border-brand-primary hover:text-brand-primary disabled:bg-brand-surface/50 disabled:text-brand-text-secondary/50 disabled:cursor-not-allowed transition-all active:scale-95 touch-manipulation"
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button
          onClick={onSubmit}
          disabled={isLoading || !prompt || !imageSelected}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-brand-primary hover:shadow-lg hover:brightness-95 active:brightness-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-background focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all touch-manipulation"
        >
          <WandIcon className="w-5 h-5" />
          {isDecorated ? 'Refine Design' : 'Decorate'}
        </button>
      </div>
    </div>
  );
};