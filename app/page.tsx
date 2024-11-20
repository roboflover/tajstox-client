'use client'

import React, { useState } from 'react';
import { ParticlesContainer } from './components/Particles'; // предположим, что вы уже обернули этот компонент в React.memo
import TelegramAuth from './components/TelegramAuth';
import axios from 'axios';
// import axios from 'axios';

const Home: React.FC = () => {
    const [score, setScore] = useState(0);
    const [firstName, setFirstName] = useState(''); // Состояние для хранения имени
    // const [telegramId, setTelegramId] = useState(0); // Состояние для хранения идентификатора пользователя
    const [token, setToken] = useState('')

    const handleClick = async () => {

        try {
            const response = await axios.post('/api/setScore', {score}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(response.data)
            setScore(response.data.data.score)
        } catch(error){

        }

    };
    
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <TelegramAuth setFirstName={setFirstName} /*setTelegramId={setTelegramId}*/ setScore={setScore} setToken={setToken} />
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
