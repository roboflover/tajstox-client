import React, { createContext, useContext, useState } from 'react';

// Типы для контекста
interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

// Создаем контекст
const TokenContext = createContext<TokenContextType | undefined>(undefined);

// Провайдер для контекста
export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Хук для использования контекста
export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
