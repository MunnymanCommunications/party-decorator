
import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from './IconComponents';

interface ImageViewerProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  loadingMessage: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ originalImage, generatedImage, isLoading, loadingMessage }) => {
  const [showOriginal, setShowOriginal] = useState(true);

  useEffect(() => {
    if (generatedImage) {
      setShowOriginal(false);
    } else {
      setShowOriginal(true);
    }
  }, [generatedImage]);

  const imageToDisplay = showOriginal ? originalImage : generatedImage;

  return (
    <div className="w-full">
        <h2 className="text-2xl font-bold text-brand-text-primary mb-6">Result</h2>
        <div className="aspect-square w-full bg-brand-surface rounded-lg flex items-center justify-center relative overflow-hidden border border-brand-surface/50">
            {isLoading && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10 transition-opacity">
                    <LoadingSpinner className="w-12 h-12 text-brand-primary" />
                    <p className="mt-4 text-lg font-medium text-brand-text-primary">{loadingMessage}</p>
                </div>
            )}
            {!originalImage && !isLoading && (
                 <div className="text-center text-brand-text-secondary p-4">
                    <p>Upload an image to get started.</p>
                    <p className="text-sm">Your generated design will appear here.</p>
                </div>
            )}
            {imageToDisplay && (
                <img src={imageToDisplay} alt={showOriginal ? 'Original room' : 'Decorated room'} className="w-full h-full object-contain" />
            )}
        </div>
        {generatedImage && (
            <div className="mt-4 flex items-center justify-center gap-4 bg-brand-surface p-2 rounded-lg">
                <span className={`px-3 py-1 transition-colors ${showOriginal ? 'text-brand-text-secondary' : 'text-brand-text-primary font-semibold'}`}>After</span>
                <label htmlFor="toggle" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input id="toggle" type="checkbox" className="sr-only" checked={showOriginal} onChange={() => setShowOriginal(!showOriginal)} />
                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                </label>
                 <span className={`px-3 py-1 transition-colors ${showOriginal ? 'text-brand-text-primary font-semibold' : 'text-brand-text-secondary'}`}>Before</span>
            </div>
        )}
        <style>{`
            input:checked ~ .dot {
                transform: translateX(100%);
                background-color: #d97706;
            }
        `}</style>
    </div>
  );
};