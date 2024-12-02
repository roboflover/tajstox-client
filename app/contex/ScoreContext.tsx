'use client';

import React, { createContext, useContext, useState } from 'react';

// Define the interface for the context
interface ScoreContextType {
  score: number;
  setScore: (score: number) => void;
}

// Create the context
const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

// Create a provider for the context
interface ScoreProviderProps {
  children: React.ReactNode;
}

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  const [score, setScore] = useState<number>(0); // Default value is 0

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

// Custom hook to use the context
export const useScore = (): ScoreContextType => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};
