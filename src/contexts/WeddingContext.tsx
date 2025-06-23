
import React, { createContext, useContext } from 'react';
import { WeddingData, WeddingWishType, User } from '@/types/wedding';

export interface WeddingContextType {
  weddingData: WeddingData;
  weddingWishes: WeddingWishType[];
  user: User | null;
  isLoggedIn: boolean;
  globalIsLoading: boolean;
  updateWeddingData: (data: Partial<WeddingData>) => void;
  loadAllWeddingWishes: () => Promise<void>;
  saveData: (data: WeddingData) => Promise<void>;
  addWish: (wish: { name: string; message: string }) => Promise<void>;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
}

export const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};
