'use client'

import React, { useState } from 'react';
import { ParticlesContainer } from './components/Particles'; // предположим, что вы уже обернули этот компонент в React.memo
import TelegramAuth from './components/TelegramAuth';
// import axios from 'axios';

const Home: React.FC = () => {
    const [score, setScore] = useState(0);
    const [firstName, setFirstName] = useState(''); // Состояние для хранения имени
    const [telegramId, setTelegramId] = useState(111); // Состояние для хранения идентификатора пользователя
    
    const handleClick = async () => {
        setScore(5)
        console.log(telegramId)
        // Асинхронные операции должны быть корректно отделены и обработаны
        // try {
        //     const responseGet = await axios.get('/api/getScore', {
        //         params: {
        //             telegramId: telegramId,  // Убедитесь, что telegramId корректно задан
        //         },
        //     });
        //     console.log('Score from server:', responseGet.data);
        //     setScore(responseGet.data.data.score); // Убедитесь, что ответ содержит обертку data
            
        //     const responsePost = await axios.post('/api/setScore', {
        //         score: score + 1, // Следующий балл для отправки
        //         telegramId: telegramId,
        //     });
        //     console.log('Response from server after setting score:', responsePost.data);
        // } catch (error) {
        //     console.error('Error processing scores:', error);
        // }
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
