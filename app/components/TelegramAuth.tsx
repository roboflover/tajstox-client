
import React, { useEffect, useCallback } from 'react';
import axios from "axios";
import { retrieveLaunchParams } from '@telegram-apps/sdk';

interface TelegramAuthProps {
    setFirstName: (name: string) => void; 
    setScore: (score: number) => void;
    setToken: (token: string) => void;
}

const TelegramAuth: React.FC<TelegramAuthProps> = ({ setFirstName, setScore, setToken }) => {

    const fetchUserScore = useCallback(async (token: string) => {
        try {
            const response = await axios.get('/api/getScore', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setScore(response.data.data.data);
        } catch (error) {
            console.error('Error fetching score:', error);
        }
    }, [setScore]);  // Добавлено `setScore` как зависимость

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