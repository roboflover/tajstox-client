import React, { useEffect, useCallback } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { useScore } from '../contex/ScoreContext';
import { useToken } from '../contex/TokenContext'; 
import { fetchUserScore } from '../services/apiService';
import { authenticateUser } from '../services/apiService'; // Импортируем функцию аутентификации

interface TelegramAuthProps {
    setFirstName: (name: string) => void; 
    setToken: (token: string ) => void;
}



const TelegramAuth: React.FC<TelegramAuthProps> = ({ setFirstName, setToken }) => {
    const { setScore } = useScore();
    const { setJwTToken } = useToken(); 
    const sendInitDataToServer = useCallback(async () => {
        const { initDataRaw } = retrieveLaunchParams();

        try {
            // Вызываем функцию аутентификации из authService
            const { token, parsedData } = await authenticateUser(initDataRaw);

            // Сохраняем токен и имя пользователя
            setToken(token);
            setJwTToken(token)
            document.cookie = `jwtToken=${token}; path=/; Secure; SameSite=Strict`;
            setFirstName(parsedData.user.firstName);

            // Загружаем очки пользователя
            await fetchUserScore(token, setScore);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [setFirstName, setToken, setScore]);

    useEffect(() => {
        sendInitDataToServer();
    }, [sendInitDataToServer]);

    return (
        <div>
            {/* Ваш UI */}
        </div>
    );
};

export default TelegramAuth;
