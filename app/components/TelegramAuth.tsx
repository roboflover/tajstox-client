'use client'

import React, { useEffect, useState } from 'react';
import { mockTelegramData, objectToQueryString } from './config'
import axios from "axios";
import { retrieveLaunchParams } from '@telegram-apps/sdk';

const TelegramAuth: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [telegramInitData, setTelegramInitData] = useState<string>('null');
  


  const authenticateUser = async (initData: string) => {
    const { initDataRaw  } = retrieveLaunchParams();
    console.log('initDataRaw', initDataRaw)
  

    try {
      const response = await axios.get(`/api/authenticate`, {
        params: {
          initData: initData
        }
      });
    
      if (response.status !== 200) {
        throw new Error('Failed to authenticate');
      }
    
      const data = 'тест'//response.data;
      setToken(data);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  }
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.Telegram) {
        const tgInfo = window.Telegram.WebApp.initData;
        setTelegramInitData(tgInfo);
        if(tgInfo === ''){
          setTelegramInitData(objectToQueryString(mockTelegramData))
        }
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  


  return (
    <div className="">
          <button onClick={() => authenticateUser(telegramInitData)}>Тестовая регистрация</button>
          {token}
      {/* Your component content */}
    </div>
  );
};

export default TelegramAuth;
