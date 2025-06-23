
import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { StorySection } from '@/components/StorySection';
import { WeddingDetailsSection } from '@/components/WeddingDetailsSection';
import { ScheduleSection } from '@/components/ScheduleSection';
import { GallerySection } from '@/components/GallerySection';
import { WishesSection } from '@/components/WishesSection';
import { MoreInfoSection } from '@/components/MoreInfoSection';
import { ContactSection } from '@/components/ContactSection';
import { JewellerSection } from '@/components/JewellerSection';
import { useWedding } from '@/contexts/WeddingContext';

const Index: React.FC = () => {
  const { globalIsLoading } = useWedding();

  if (globalIsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading wedding details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <StorySection />
      <WeddingDetailsSection />
      <ScheduleSection />
      <GallerySection />
      <WishesSection />
      <MoreInfoSection />
      <ContactSection />
      <JewellerSection />
    </div>
  );
};

export default Index;
