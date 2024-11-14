'use client'

import React, { useEffect, useState } from 'react';
import { isDevelopment, mockTelegramData, objectToQueryString } from './config'
import axios from "axios";
1
const TelegramAuth: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [telegramInitData, setTelegramInitData] = useState<string>('null');
  
  const authenticateUser = async (initData: string) => {
    try {
      const response = await axios.get(`/api/authenticate`, {
        params: {
          initData: initData
        }
      });
    
      if (response.status !== 200) {
        throw new Error('Failed to authenticate');
      }
    
      const data = ''//response.data;
      setToken(data);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  }
  
  useEffect(() => {
    console.log('tgInfo1');

    // if (window.Telegram) {
      // Используем реальные данные в продакшн-режиме
      if(window.Telegram){
      const tgInfo = window.Telegram.WebApp.initData;
      console.log('tgInfo2', tgInfo);
      setTelegramInitData(tgInfo);
    }
    // }
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="">
          <button onClick={() => authenticateUser(telegramInitData)}>Кнопка</button>
      {/* Your component content */}
    </div>
  );
};

export default TelegramAuth;
