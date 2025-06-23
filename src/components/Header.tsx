
import React from 'react';
import { Button } from '@/components/ui/button';
import { useWedding } from '@/contexts/WeddingContext';

export const Header: React.FC = () => {
  const { isLoggedIn, logout } = useWedding();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex space-x-6">
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('story')}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            Our Story
          </button>
          <button 
            onClick={() => scrollToSection('details')}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            Details
          </button>
          <button 
            onClick={() => scrollToSection('schedule')}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            Schedule
          </button>
          <button 
            onClick={() => scrollToSection('gallery')}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            Gallery
          </button>
          <button 
            onClick={() => scrollToSection('wishes')}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            Wishes
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            Contact
          </button>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          ) : (
            <Button onClick={() => window.location.href = '/login'}>
              Admin Login
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
