
import React, { useEffect, useCallback } from 'react';
import axios from "axios";
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { useScore } from '../contex/ScoreContext'; // Импортируем хук

interface TelegramAuthProps {
    setFirstName: (name: string) => void; 
    setToken: (token: string) => void;
}

const TelegramAuth: React.FC<TelegramAuthProps> = ({ setFirstName, setToken }) => {
    const { setScore } = useScore(); // Берем setScore из контекста

    const fetchUserScore = useCallback(async (token: string) => {
        try {
            const response = await axios.get('/api/getScore', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setScore(response.data.data.data); // Устанавливаем score через контекст
        } catch (error) {
            console.error('Error fetching score:', error);
        }
    }, [setScore]);


    const sendInitDataToServer = useCallback(async () => {
        const { initDataRaw } = retrieveLaunchParams();

        try {
            const response = await axios.post('/api/authenticate', {}, {
                headers: {
                    Authorization: `tma ${initDataRaw}`,
                },
            });
            
            const jwtToken = response.data.token;
            setToken(jwtToken)
            document.cookie = `jwtToken=${jwtToken}; path=/; Secure; SameSite=Strict;`;

            setFirstName(response.data.parsedData.user.firstName);

            await fetchUserScore(jwtToken);

        } catch (error) {
            console.error('Error:', error);
        }
    }, [setFirstName, setToken, fetchUserScore]);  // Добавлено `fetchUserScore` как зависимость

    useEffect(() => {
        sendInitDataToServer();
    }, [sendInitDataToServer]);

    return (
        <div>
            {/* {score !== null ? <p>Your score: {score}</p> : <p>Loading score...</p>} */}
        </div>
    );
};

export default TelegramAuth;