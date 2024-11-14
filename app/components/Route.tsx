// pages/index.tsx
import { useState } from 'react';

const Home = () => {
  const [token, setToken] = useState<string | null>(null);

  const authenticateUser = async (initData: string) => {
    try {
      const response = await fetch(`/api/authenticate?initData=${encodeURIComponent(initData)}`);
      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await response.text();
      setToken(data);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  // Получите данные initData из параметров запроса или другого источника
  const telegramInitData = '...'; // Это должно быть заменено на реальные данные

  return (
    <div>
      <h1>Authentication Example</h1>
      <button onClick={() => authenticateUser(telegramInitData)}>
        Authenticate
      </button>
      {token && <div>Authenticated! JWT Token: {token}</div>}
    </div>
  );
};

export default Home;
