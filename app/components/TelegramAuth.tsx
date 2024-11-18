'use client'

import React from 'react';
import axios from "axios";
import { retrieveLaunchParams } from '@telegram-apps/sdk';

interface TelegramAuthProps {
    setFirstName: (name: string) => void; // Проп для обновления имени
}

const TelegramAuth: React.FC<TelegramAuthProps> = ({ setFirstName }) => {

  const sendInitDataToServer = async () => {
    const { initDataRaw } = retrieveLaunchParams(); // Get init data
    
    try {
      // Send init data to the server
      const response = await axios.post('/api/authenticate', {}, {
        headers: {
          Authorization: `tma ${initDataRaw}`, // Add init data in headers
        },
      });

      console.log('Server Response:', response.data);
      setFirstName(response.data.user.firstName); // Устанавливаем firstName из ответа сервера
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <h1>Telegram Auth Example</h1>
      <button onClick={sendInitDataToServer}>Send Init Data</button>
    </div>
  );
};

export default TelegramAuth;
