'use client'

import React, { useState } from 'react';
import { ParticlesContainer } from './components/Particles'; // предположим, что вы уже обернули этот компонент в React.memo
import TelegramAuth from './components/TelegramAuth';
import axios from 'axios';

const Home: React.FC = () => {
    const [score, setScore] = useState(0);
    const [firstName, setFirstName] = useState(''); // Состояние для хранения имени
    const [telegramId, setTelegramId] = useState(0); // Состояние для хранения идентификатора пользователя
    
    const handleClick = async () => {
        // Обновляем локальное состояние score
        const newScore = score + 1;
        setScore(newScore);

        try {
            const response = await axios.get('/api/users', {
                params: {
                    telegramId: telegramId,
                },
            });
            console.log('Response from server:', response.data);
            setScore(response.data.score)
        } catch (error) {
            console.error('Error sending score:', error);
        }
        
        // Отправляем POST-запрос с новым значением score
        try {
            const response = await axios.post('/api/users', {
                score: newScore, // Передаем score в теле запроса
                telegramId: telegramId,
            });
            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error sending score:', error);
        }
    };

    
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <TelegramAuth setFirstName={setFirstName} setTelegramId={setTelegramId}/>
            <ParticlesContainer />
            <div
                className="flex items-center justify-center min-h-screen"
                style={{
                    background: 'radial-gradient(circle, #3b82f6, #000000)',
                    backgroundPosition: 'center',
                }}
            >
                <div className="text-center">
                {firstName && <div className="mb-4 text-2xl font-bold text-white">Hello, {firstName}!</div>}                    
                <div className="mb-4 text-2xl font-bold text-white">You score: {score}</div>
                    <button
                        onClick={handleClick}
                        className="w-16 h-16 text-white bg-blue-700 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
