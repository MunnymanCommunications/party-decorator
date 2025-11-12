
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
    } catch (err) {
      console.error(err);
      setError('Could not generate the image. Please refine your prompt and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, generatedImage, prompt]);

  const handleGenerateListItems = useCallback(async () => {
    if (!originalImage || !generatedImage) return;
    setError(null);
    setIsLoading(true);
    setShoppingListLinks([]);
    setSources([]);
    setLoadingMessage('Creating your shopping list...');

    try {
      const items = await generateShoppingListItems(originalImage.base64, generatedImage);
      setShoppingListItems(items);
    } catch (err) {
      console.error(err);
      setError('Could not generate the shopping list. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, generatedImage]);
  
  const handleFindProductLinks = useCallback(async () => {
    if (!shoppingListItems) return;
    setError(null);
    setIsFindingLinks(true);

    try {
      const { links, sources: newSources } = await findProductLinks(shoppingListItems, prompt);
      setShoppingListLinks(links);
      setSources(newSources);
    } catch (err) {
        console.error(err);
        setError('Could not find product links. Please try again.');
    } finally {
        setIsFindingLinks(false);
    }
  }, [shoppingListItems, prompt]);

  return (
    <div className="min-h-screen bg-brand-background text-brand-text-primary font-sans">
      <Header />
      <main className="p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-brand-text-primary">Controls</h2>
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg">
                <p className="font-bold">An Error Occurred</p>
                <p>{error}</p>
              </div>
            )}
            {!originalImage ? (
              <ImageUploader onImageSelected={handleImageUpload} />
            ) : (
              <>
                <PromptControls
                  prompt={prompt}
                  setPrompt={setPrompt}
                  onSubmit={handleSubmitPrompt}
                  onGenerateList={handleGenerateListItems}
                  isLoading={isLoading}
                  isDecorated={!!generatedImage}
                  imageSelected={!!originalImage}
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
              </>
            )}
          </div>
          <div>
            <ImageViewer
              originalImage={originalImage?.base64 || null}
              generatedImage={generatedImage}
              isLoading={isLoading}
              loadingMessage={loadingMessage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;