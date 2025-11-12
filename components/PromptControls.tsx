
import React from 'react';
import { WandIcon, ListIcon } from './IconComponents';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  onGenerateList: () => void;
  isLoading: boolean;
  isDecorated: boolean;
  imageSelected: boolean;
}

export const PromptControls: React.FC<PromptControlsProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  onGenerateList,
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
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-brand-text-secondary mb-2">
          {isDecorated ? 'Describe your refinements...' : 'Describe the party theme...'}
        </label>
        <textarea
          id="prompt"
          rows={3}
          className="w-full bg-brand-background/50 border border-brand-surface rounded-lg p-3 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition text-brand-text-primary placeholder-brand-text-secondary/50"
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
              className="px-3 py-1 text-sm border border-brand-surface rounded-full text-brand-text-secondary bg-brand-surface hover:bg-brand-surface/50 hover:border-brand-secondary disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
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
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:brightness-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-background focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <WandIcon className="w-5 h-5" />
          {isDecorated ? 'Refine Design' : 'Decorate'}
        </button>
        <button
          onClick={onGenerateList}
          disabled={isLoading || !isDecorated}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-brand-secondary text-base font-medium rounded-md shadow-sm text-brand-secondary bg-brand-primary/20 hover:bg-brand-primary/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-background focus:ring-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ListIcon className="w-5 h-5" />
          Generate Shopping List
        </button>
      </div>
    </div>
  );
};