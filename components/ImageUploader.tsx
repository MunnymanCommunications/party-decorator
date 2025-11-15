import React, { useCallback, useState } from 'react';
import { UploadIcon } from './IconComponents';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if(e.dataTransfer.files[0].type.startsWith('image/')){
        onImageSelected(e.dataTransfer.files[0]);
      }
    }
  }, [onImageSelected]);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="bg-brand-surface rounded-lg p-4 sm:p-6 border-2 border-dashed border-brand-secondary/50 hover:border-brand-primary transition-all duration-300 animate-fade-in">
      <label
        htmlFor="image-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-md cursor-pointer transition-all duration-200 active:scale-95 ${isDragging ? 'bg-brand-primary/10 scale-105' : 'hover:bg-brand-primary/5'}`}
      >
        <UploadIcon className={`w-10 h-10 sm:w-12 sm:h-12 text-brand-text-secondary mb-3 sm:mb-4 transition-transform ${isDragging ? 'animate-bounce-gentle' : ''}`} />
        <p className="text-base sm:text-lg font-semibold text-brand-text-primary">
          Upload an image of your room
        </p>
        <p className="text-sm sm:text-base text-brand-text-secondary mt-1">
          Drag & drop a file here or tap to select
        </p>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <p className="text-xs text-brand-text-secondary mt-3 sm:mt-4 text-center">Supports JPG, PNG, WEBP, etc.</p>
    </div>
  );
};