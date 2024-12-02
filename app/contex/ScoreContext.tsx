import React, { createContext, useContext, useState } from 'react';

// Определяем интерфейс для состояния
interface ScoreContextType {
  score: number | null;
  setScore: (score: number) => void;
}

// Создаем контекст
const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

// Создаем провайдер для контекста
export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState<number | null>(null);

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

// Хук для использования контекста
export const useScore = (): ScoreContextType => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};
