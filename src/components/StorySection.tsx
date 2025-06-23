
import React from 'react';
import { EditableText } from './EditableText';
import { useWedding } from '@/contexts/WeddingContext';

export const StorySection: React.FC = () => {
  const { weddingData, updateWeddingData } = useWedding();

  const updateTitle = (newTitle: string) => {
    updateWeddingData({
      story: { ...weddingData.story, title: newTitle }
    });
  };

  const updateContent = (newContent: string) => {
    updateWeddingData({
      story: { ...weddingData.story, content: newContent }
    });
  };

  return (
    <section id="story" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <EditableText 
            value={weddingData.story.title}
            onSave={updateTitle}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 block"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              {weddingData.story.title}
            </h2>
          </EditableText>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={weddingData.story.image} 
                alt="Our Story" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div className="text-left">
              <EditableText 
                value={weddingData.story.content}
                onSave={updateContent}
                multiline
                className="text-gray-600 leading-relaxed text-lg block"
              >
                <p className="text-gray-600 leading-relaxed text-lg">
                  {weddingData.story.content}
                </p>
              </EditableText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
