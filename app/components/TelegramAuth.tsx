import React, { useEffect, useCallback } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { useScore } from '../contex/ScoreContext';
import { fetchUserScore } from '../services/apiService';
import { authenticateUser } from '../services/apiService'; // Импортируем функцию аутентификации
import { useToken } from '../contex/TokenContext';

interface TelegramAuthProps {
    setFirstName: (name: string) => void;
    externalSetToken: (token: string) => void; // Переименовали пропс setToken в externalSetToken
}

const TelegramAuth: React.FC<TelegramAuthProps> = ({ setFirstName, externalSetToken }) => {
    const { setScore } = useScore();
    const { setToken } = useToken(); // Это setToken из контекста

    const sendInitDataToServer = useCallback(async () => {
        const { initDataRaw } = retrieveLaunchParams();
        console.log('initDataRaw', initDataRaw)
        try {
            // Вызываем функцию аутентификации из authService
            const { token, parsedData } = await authenticateUser(initDataRaw);

            // Сохраняем токен через оба метода
            setToken(token); // Сохраняем токен в контекст через хук useToken
            externalSetToken(token); // Вызываем функцию, переданную через пропсы
            // console.log('TelegramAuth token', token);

            document.cookie = `jwtToken=${token}; path=/; Secure; SameSite=Strict`;
            setFirstName(parsedData.user.firstName);

            // Загружаем очки пользователя
            await fetchUserScore(token, setScore);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [setFirstName, externalSetToken, setToken, setScore]);

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
