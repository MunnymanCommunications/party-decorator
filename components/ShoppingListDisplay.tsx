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
    <div className="bg-brand-surface rounded-lg p-6 border border-brand-surface/50 mt-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-brand-text-primary">Your Shopping List</h3>
        {links.length > 0 && (
          <div className="relative">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-brand-secondary text-sm font-medium rounded-md shadow-sm text-brand-secondary hover:bg-brand-secondary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-secondary transition-colors"
              aria-label="Share shopping list"
            >
              <ShareIcon className="w-4 h-4" />
              Share
            </button>
             {shareStatus === 'success' && (
              <span className="absolute -top-7 right-0 text-xs bg-brand-secondary text-brand-background px-2 py-0.5 rounded-full shadow-lg transition-all animate-fade-in-down">
                {navigator.share ? 'Shared!' : 'Copied!'}
              </span>
            )}
          </div>
        )}
      </div>
      
      {links.length > 0 ? (
        <ul className="space-y-3">
          {links.map((linkItem, index) => (
            <li key={index} className="flex items-center justify-between bg-brand-background/50 p-3 rounded-md">
              <span className="text-brand-text-secondary">{linkItem.item}</span>
              <a
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary hover:brightness-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary transition-transform active:scale-95"
              >
                Open Link
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="prose prose-invert prose-sm max-w-none text-brand-text-secondary space-y-2">
            <ul>
                {formattedItems}
            </ul>
             {items && links.length === 0 && (
              <div className="mt-6 text-center not-prose">
                  <button
                      onClick={onFindLinks}
                      disabled={isFindingLinks}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:brightness-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
        <div className="mt-6">
          <h4 className="font-semibold text-brand-text-primary mb-2">Sources</h4>
          <ul className="space-y-2">
            {sources.filter(s => s.web && s.web.uri).map((source, index) => (
              <li key={index}>
                <a
                  href={source.web!.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-secondary hover:text-brand-primary hover:underline transition-colors break-all"
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