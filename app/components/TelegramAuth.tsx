'use client'

import React, { useEffect , useCallback} from 'react';
import axios from "axios";
import { retrieveLaunchParams } from '@telegram-apps/sdk';

interface TelegramAuthProps {
    setFirstName: (name: string) => void; // Проп для обновления имени
    setTelegramId: (name: number) => void;
}

const TelegramAuth: React.FC<TelegramAuthProps> = ({ setFirstName, setTelegramId }) => {
    const sendInitDataToServer = useCallback(async () => {
        const { initDataRaw } = retrieveLaunchParams(); // Получаем начальные данные

        try {
            // Отправляем начальные данные на сервер
            const response = await axios.post('/api/authenticate', {}, {
                headers: {
                    Authorization: `tma ${initDataRaw}`, // Добавляем начальные данные в заголовки
                },
            });
            
            console.log('Server Response:', response.data);
            const jwtToken = response.data.token
            console.log(jwtToken)

            setFirstName(response.data.parsedData.user.firstName); // Устанавливаем firstName из ответа сервера
            setTelegramId(response.data.parsedData.user.id)

        } catch (error) {
            console.error('Error:', error);
        }
    }, [setFirstName, setTelegramId]); // Указать зависимости, которые используются внутри функции

    useEffect(() => {
        sendInitDataToServer();
    }, [sendInitDataToServer]); // Указан в зависимостях useEffect

    return (
        <div>
            {/* Здесь больше нет кнопки, так как вызов происходит автоматически */}
        </div>
    );
};

export default TelegramAuth;
