'use client'

import React, { useEffect , useCallback} from 'react';
import axios from "axios";
import { retrieveLaunchParams } from '@telegram-apps/sdk';

interface TelegramAuthProps {
    setFirstName: (name: string) => void; // Проп для обновления имени
}

const TelegramAuth: React.FC<TelegramAuthProps> = ({ setFirstName }) => {

    const sendInitDataToServer = async () => {
        const { initDataRaw } = retrieveLaunchParams(); // Получаем начальные данные

        try {
            // Отправляем начальные данные на сервер
            const response = await axios.post('/api/authenticate', {}, {
                headers: {
                    Authorization: `tma ${initDataRaw}`, // Добавляем начальные данные в заголовки
                },
            });

            console.log('Server Response:', response.data);
            setFirstName(response.data.user.firstName); // Устанавливаем firstName из ответа сервера
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        // Выполняем sendInitDataToServer при загрузке компонента
        sendInitDataToServer();
    }, []); // Пустой массив зависимости, чтобы эффект выполнялся только при монтировании

    return (
        <div>
            {/* Здесь больше нет кнопки, так как вызов происходит автоматически */}
        </div>
    );
};

export default TelegramAuth;
