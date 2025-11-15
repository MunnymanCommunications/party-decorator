import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageViewer } from './components/ImageViewer';
import { PromptControls } from './components/PromptControls';
import { ShoppingListDisplay } from './components/ShoppingListDisplay';
import { editImage, generateShoppingListItems, findProductLinks } from './services/geminiService';
import type { Source, ShoppingListItem } from './types';
import { fileToBase64 } from './utils/fileUtils';

type ImageState = {
  file: File;
  base64: string;
} | null;

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageState>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  
  const [shoppingListItems, setShoppingListItems] = useState<string | null>(null);
  const [shoppingListLinks, setShoppingListLinks] = useState<ShoppingListItem[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFindingLinks, setIsFindingLinks] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    try {
      setError(null);
      const base64 = await fileToBase64(file);
      setOriginalImage({ file, base64 });
      setGeneratedImage(null);
      setShoppingListItems(null);
      setShoppingListLinks([]);
      setSources([]);
      setPrompt('');
    } catch (err) {
      console.error(err);
      setError('Failed to load image. Please try another file.');
    }
  };

  const handleSubmitPrompt = useCallback(async () => {
    if (!originalImage) return;
    setError(null);
    setIsLoading(true);
    setLoadingMessage(generatedImage ? 'Refining your design...' : 'Decorating your room...');
    // Clear previous shopping list when a new design is generated
    setShoppingListItems(null);
    setShoppingListLinks([]);
    setSources([]);

    try {
      const imageToEdit = generatedImage || originalImage.base64;
      const newImageBase64 = await editImage(imageToEdit, prompt);
      setGeneratedImage(newImageBase64);
      
      setLoadingMessage('Creating your shopping list...');
      const items = await generateShoppingListItems(originalImage.base64, newImageBase64);
      setShoppingListItems(items);

    } catch (err) {
      console.error(err);
      setError('Could not generate the image or shopping list. Please refine your prompt and try again.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [originalImage, generatedImage, prompt]);
  
  const handleFindProductLinks = useCallback(async () => {
    if (!shoppingListItems) return;
    setError(null);
    setIsFindingLinks(true);
    setLoadingMessage('Finding product links...');
    try {
        const { links, sources: newSources } = await findProductLinks(shoppingListItems, prompt);
        setShoppingListLinks(links);
        setSources(newSources);
    } catch (err) {
        console.error(err);
        setError('Could not find product links. Please try again.');
    } finally {
        setIsFindingLinks(false);
        setLoadingMessage('');
    }
  }, [shoppingListItems, prompt]);


  return (
    <div className="min-h-screen bg-brand-background text-brand-text-primary font-sans">
      <Header />
      <main className="p-3 sm:p-4 md:p-6 lg:p-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 sm:gap-6 order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary">Controls</h2>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-700 p-3 rounded-lg animate-slide-up">
                <p className="font-bold text-sm sm:text-base">An Error Occurred</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            {!originalImage ? (
              <ImageUploader onImageSelected={handleImageUpload} />
            ) : (
              <PromptControls
                prompt={prompt}
                setPrompt={setPrompt}
                onSubmit={handleSubmitPrompt}
                isLoading={isLoading}
                isDecorated={!!generatedImage}
                imageSelected={!!originalImage}
              />
            )}
          </div>
          <div className="order-1 lg:order-2">
            <ImageViewer
              originalImage={originalImage?.base64 || null}
              generatedImage={generatedImage}
              isLoading={isLoading || isFindingLinks}
              loadingMessage={loadingMessage}
            />
             {(shoppingListItems || shoppingListLinks.length > 0) && (
              <ShoppingListDisplay
                items={shoppingListItems}
                links={shoppingListLinks}
                sources={sources}
                onFindLinks={handleFindProductLinks}
                isFindingLinks={isFindingLinks}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;