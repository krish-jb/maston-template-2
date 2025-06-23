
import React from 'react';
import { EditableText } from './EditableText';
import { useWedding } from '@/contexts/WeddingContext';

export const HeroSection: React.FC = () => {
  const { weddingData, updateWeddingData } = useWedding();

  const updateQuote = (newQuote: string) => {
    updateWeddingData({
      couple: { ...weddingData.couple, weddingQuote: newQuote }
    });
  };

  const updateGroomName = (newName: string) => {
    updateWeddingData({
      couple: { ...weddingData.couple, groomName: newName }
    });
  };

  const updateBrideName = (newName: string) => {
    updateWeddingData({
      couple: { ...weddingData.couple, brideName: newName }
    });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 pt-20">
      <div className="text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <EditableText 
            value={weddingData.couple.weddingQuote}
            onSave={updateQuote}
            multiline
            className="text-2xl md:text-4xl font-light text-gray-700 italic leading-relaxed"
          >
            <p className="text-2xl md:text-4xl font-light text-gray-700 italic leading-relaxed">
              "{weddingData.couple.weddingQuote}"
            </p>
          </EditableText>
        </div>
        
        <div className="space-y-4">
          <EditableText 
            value={weddingData.couple.groomName}
            onSave={updateGroomName}
            className="text-4xl md:text-6xl font-bold text-pink-600 block"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-pink-600">
              {weddingData.couple.groomName}
            </h1>
          </EditableText>
          
          <div className="text-3xl md:text-5xl text-gray-400 font-light">
            &
          </div>
          
          <EditableText 
            value={weddingData.couple.brideName}
            onSave={updateBrideName}
            className="text-4xl md:text-6xl font-bold text-pink-600 block"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-pink-600">
              {weddingData.couple.brideName}
            </h1>
          </EditableText>
        </div>
        
        <div className="mt-12">
          <img 
            src={weddingData.couple.image} 
            alt="Couple" 
            className="mx-auto rounded-full w-48 h-48 object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
