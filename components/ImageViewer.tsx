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
        <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-4 sm:mb-6">Result</h2>
        <div className="aspect-square w-full bg-brand-surface rounded-lg flex items-center justify-center relative overflow-hidden border-2 border-brand-surface/50 shadow-md">
            {isLoading && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10 transition-opacity animate-fade-in">
                    <LoadingSpinner className="w-10 h-10 sm:w-12 sm:h-12 text-brand-primary" />
                    <p className="mt-4 text-sm sm:text-lg font-medium text-white px-4 text-center">{loadingMessage}</p>
                </div>
            )}
            {!originalImage && !isLoading && (
                 <div className="text-center text-brand-text-secondary p-4">
                    <p className="text-sm sm:text-base">Upload an image to get started.</p>
                    <p className="text-xs sm:text-sm mt-1">Your generated design will appear here.</p>
                </div>
            )}
            {imageToDisplay && (
                <img src={imageToDisplay} alt={showOriginal ? 'Original room' : 'Decorated room'} className="w-full h-full object-contain animate-fade-in" />
            )}
        </div>
        {generatedImage && (
             <div className="mt-4 flex items-center justify-center animate-slide-up">
                <label htmlFor="toggle" className="flex items-center cursor-pointer group bg-brand-surface p-2 sm:p-2.5 rounded-lg shadow-sm hover:shadow-md transition-shadow touch-manipulation">
                    <input id="toggle" type="checkbox" className="sr-only peer" checked={!showOriginal} onChange={() => setShowOriginal(!showOriginal)} />
                    <span className="px-2 sm:px-3 py-1 transition-all text-sm sm:text-base text-brand-text-primary font-semibold peer-checked:text-brand-text-secondary peer-checked:font-normal">Before</span>
                    <div className="relative mx-1 sm:mx-2">
                        <div className="block bg-brand-secondary/40 w-12 sm:w-14 h-7 sm:h-8 rounded-full peer-checked:bg-brand-primary/60 transition-all"></div>
                        <div className="absolute left-1 top-1 bg-white w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-transform peer-checked:translate-x-full peer-checked:bg-brand-secondary shadow-sm"></div>
                    </div>
                    <span className="px-2 sm:px-3 py-1 transition-all text-sm sm:text-base text-brand-text-secondary peer-checked:text-brand-text-primary peer-checked:font-semibold">After</span>
                </label>
            </div>
        )}
    </div>
  );
};