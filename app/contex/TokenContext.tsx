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
  const [token, setTokenState] = useState<string | null>(null);

  // Оборачиваем setTokenState для добавления логирования
  const setToken = (newToken: string | null) => {
    console.log('Updating token:', newToken); // Логируем новое значение токена
    setTokenState(newToken);
  };

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
