import React, { useState, useEffect } from 'react';
import type { Source, ShoppingListItem } from '../types';
import { ShareIcon, LoadingSpinner } from './IconComponents';

interface ShoppingListDisplayProps {
  items: string | null;
  links: ShoppingListItem[];
  sources: Source[];
  onFindLinks: () => void;
  isFindingLinks: boolean;
}

export const ShoppingListDisplay: React.FC<ShoppingListDisplayProps> = ({ items, links, sources, onFindLinks, isFindingLinks }) => {
  const [shareStatus, setShareStatus] = useState<'idle' | 'success'>('idle');
  
  const formattedItems = items
    ?.split('\n')
    .map((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
        return <li key={index} className="ml-5 list-disc">{trimmedLine.substring(2)}</li>;
      }
      if (trimmedLine) {
        return <li key={index} className="ml-5 list-disc">{trimmedLine}</li>
      }
      return null;
    })
    .filter(Boolean);

  const handleShare = async () => {
    if (links.length === 0) return;

    const shareText = "Here's my shopping list for the party decorations:\n\n" +
      links.map(link => `- ${link.item}: ${link.url}`).join('\n');

    const shareData = {
        title: 'Party Shopping List',
        text: shareText,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            setShareStatus('success');
        } catch (err) {
            console.error('Share failed:', err);
        }
    } else {
        try {
            await navigator.clipboard.writeText(shareText);
            setShareStatus('success');
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    }
  };

  useEffect(() => {
    if (shareStatus === 'success') {
      const timer = setTimeout(() => setShareStatus('idle'), 2500);
      return () => clearTimeout(timer);
    }
  }, [shareStatus]);


  return (
    <div className="bg-brand-surface rounded-lg p-4 sm:p-6 border-2 border-brand-surface/50 mt-4 animate-slide-up shadow-md">
      <div className="flex items-center justify-between mb-4 gap-2">
        <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary">Your Shopping List</h3>
        {links.length > 0 && (
          <div className="relative">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 border-2 border-brand-secondary text-xs sm:text-sm font-medium rounded-lg shadow-sm text-brand-secondary hover:bg-brand-secondary/10 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-secondary transition-all touch-manipulation"
              aria-label="Share shopping list"
            >
              <ShareIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Share</span>
            </button>
             {shareStatus === 'success' && (
              <span className="absolute -top-8 right-0 text-xs bg-brand-secondary text-brand-background px-2 py-1 rounded-lg shadow-lg transition-all animate-fade-in-down whitespace-nowrap">
                {navigator.share ? 'Shared!' : 'Copied!'}
              </span>
            )}
          </div>
        )}
      </div>

      {links.length > 0 ? (
        <ul className="space-y-2 sm:space-y-3">
          {links.map((linkItem, index) => (
            <li key={index} className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 bg-brand-background/50 p-3 rounded-lg hover:bg-brand-background/70 transition-colors">
              <span className="text-sm sm:text-base text-brand-text-secondary flex-1">{linkItem.item}</span>
              <a
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-lg shadow-sm text-white bg-brand-primary hover:brightness-95 hover:shadow-md active:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary transition-all active:scale-95 touch-manipulation whitespace-nowrap"
              >
                Open Link
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="prose prose-invert prose-sm max-w-none text-brand-text-secondary space-y-2">
            <ul className="text-sm sm:text-base">
                {formattedItems}
            </ul>
             {items && links.length === 0 && (
              <div className="mt-6 text-center not-prose">
                  <button
                      onClick={onFindLinks}
                      disabled={isFindingLinks}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg shadow-md text-white bg-brand-primary hover:brightness-95 hover:shadow-lg active:brightness-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all touch-manipulation"
                  >
                      {isFindingLinks ? (
                          <>
                              <LoadingSpinner className="w-5 h-5" />
                              Finding...
                          </>
                      ) : (
                          'Find on Amazon'
                      )}
                  </button>
              </div>
          )}
        </div>
      )}

      {sources && sources.length > 0 && links.length > 0 && (
        <div className="mt-4 sm:mt-6">
          <h4 className="font-semibold text-brand-text-primary mb-2 text-sm sm:text-base">Sources</h4>
          <ul className="space-y-2">
            {sources.filter(s => s.web && s.web.uri).map((source, index) => (
              <li key={index}>
                <a
                  href={source.web!.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-brand-secondary hover:text-brand-primary hover:underline transition-colors break-all"
                >
                  {source.web!.title || source.web!.uri}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};