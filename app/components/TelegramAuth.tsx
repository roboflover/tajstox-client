'use client'

import React, { useEffect, useState } from 'react';
import { mockTelegramData, objectToQueryString } from './config'
import axios from "axios";
import { retrieveLaunchParams } from '@telegram-apps/sdk';

const TelegramAuth: React.FC = () => {

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
