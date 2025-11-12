
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
    <div className="bg-brand-surface rounded-lg p-6 border-2 border-dashed border-gray-600 hover:border-brand-primary transition-colors duration-300">
      <label
        htmlFor="image-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`flex flex-col items-center justify-center text-center p-8 rounded-md cursor-pointer transition-all ${isDragging ? 'bg-brand-primary/10 scale-105' : ''}`}
      >
        <UploadIcon className="w-12 h-12 text-gray-500 mb-4" />
        <p className="text-lg font-semibold text-brand-text-primary">
          Upload an image of your room
        </p>
        <p className="text-brand-text-secondary mt-1">
          Drag & drop a file here or click to select
        </p>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <p className="text-xs text-gray-500 mt-4 text-center">Supports JPG, PNG, WEBP, etc.</p>
    </div>
  );
};
