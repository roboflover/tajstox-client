'use client'

import { useScore } from '../contex/ScoreContext';
import { authenticateUser, fetchUserScore } from '../services/apiService';
import { useCallback, useEffect } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import HandshakeIcon from '@mui/icons-material/Handshake';
import { blue } from '@mui/material/colors';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InviteFriend from './components/InviteFriend';

const Team: React.FC = () => {
    const { setScore } = useScore();

    const sendInitDataToServer = useCallback(async () => {
        const { initDataRaw } = retrieveLaunchParams();

        try {
            // Вызываем функцию аутентификации из authService
            const { token } = await authenticateUser(initDataRaw);
            // Сохраняем токен и имя пользователя
            //setToken(token);
            document.cookie = `jwtToken=${token}; path=/; Secure; SameSite=Strict`;

            // Загружаем очки пользователя
            await fetchUserScore(token, setScore);

        } catch (error) {
            console.error('Error:', error);
        }
    }, [setScore]);

    useEffect(() => {
        sendInitDataToServer();
    }, [sendInitDataToServer]);

    return (
        <div className="space-y-6 mt-20 mr-5 ml-5">  {/* Дополнительно добавили отступ между строками */}
            <InviteFriend/>
            {/* Строка со свторой криптовалютой */}
            <div className="flex flex-col justify-center items-center">
                <div className="flex items-center ml-2 mb-2">
                    <HandshakeIcon  fontSize="large" sx={{ color: blue[500]}} />
                </div>
                <div className="flex items-center ml-2 ">
                <span className="ml-2  font-semibold text-2xl">0 Friends</span>
                </div>
            </div>

            {/* Существующая центральная кнопка */}
            <div className="flex justify-center items-center">
                <button className="flex items-center px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-20 space-x-2">
                    {/* Текст */}
                    <span>Invite a friend</span>
                </button>
                <button className="flex items-center px-2 py-3 ml-2 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-20 space-x-2">
                <ContentCopyIcon/>

                </button>
            </div>
        </div>
    );
};

export default Team;