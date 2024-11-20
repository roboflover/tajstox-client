'use client'

import React, { useEffect, useCallback, useState } from 'react';
import axios from "axios";
import { retrieveLaunchParams } from '@telegram-apps/sdk';

interface TelegramAuthProps {
    setFirstName: (name: string) => void; 
    setTelegramId: (id: number) => void;
    setScore: (score: number) => void;
}

const TelegramAuth: React.FC<TelegramAuthProps> = ({ setFirstName, setTelegramId, setScore }) => {

    const sendInitDataToServer = useCallback(async () => {
        const { initDataRaw } = retrieveLaunchParams();

        try {
            const response = await axios.post('/api/authenticate', {}, {
                headers: {
                    Authorization: `tma ${initDataRaw}`,
                },
            });
            
            const jwtToken = response.data.token;
            // Сохраняем токен в cookie
            document.cookie = `jwtToken=${jwtToken}; path=/; Secure; SameSite=Strict;`;

            setFirstName(response.data.parsedData.user.firstName);
            setTelegramId(response.data.parsedData.user.id);

            // После успешной аутентификации запрашиваем очки
            await fetchUserScore(jwtToken);

        } catch (error) {
            console.error('Error:', error);
        }
    }, [setFirstName, setTelegramId]);

    const fetchUserScore = useCallback(async (token:string) => {
        try {
            const response = await axios.get('/api/getScore', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            //console.log(response.data.data.data)
            setScore(response.data.data.data);
        } catch (error) {
            console.error('Error fetching score:', error);
        }
    }, []);

    useEffect(() => {
        sendInitDataToServer();
    }, [sendInitDataToServer]);

    return (
        <div>
            {/* {score !== null ? <p>Your score: {score}</p> : <p>Loading score...</p>} */}
        </div>
    );
};

// Пример функции для получения токена из cookie и добавления в заголовки запроса
const getAuthHeaders = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('jwtToken='))
                    ?.split('=')[1];
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export default TelegramAuth;
