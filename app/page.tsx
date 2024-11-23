'use client'

import React, { useState } from 'react';
import { ParticlesContainer } from './components/Particles'; // предположим, что вы уже обернули этот компонент в React.memo
import TelegramAuth from './components/TelegramAuth';
import axios from 'axios';
// import axios from 'axios';

const Home: React.FC = () => {
    const [score, setScore] = useState(0);
    const [firstName, setFirstName] = useState('Name'); // Состояние для хранения имени
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
            setScore(response.data.data.data.score)
        } catch(error){
            console.log(error)
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
                    position: 'relative'
                }}
            >
                {/* Верхнее меню */}
                <div
                    style={{ left: '15px', right: '15px' }}
                    className="absolute top-4 transform translate-x-0 bg-white opacity-20 rounded-full shadow-md p-4 flex justify-between items-center"
                >
                    <p className="text-black flex-1 text-center relative">
                    {firstName}
                        <span className="h-full border-l border-black absolute right-0 top-0"></span>
                    </p>
                    <p className="text-black flex-1 text-center">
                        Пункт 2
                    </p>
                </div>
    
                {/* Контент */}
                <div className="text-center">
                    <div className="mb-4 text-2xl font-bold text-white">{score.toLocaleString('en-EN')}</div>
                    <button
                        onClick={handleClick}
                        className="w-16 h-16 text-white bg-blue-700 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        +
                    </button>
                </div>
    
                {/* Нижнее меню */}
                <div
                    style={{ left: '15px', right: '15px' }}
                    className="absolute bottom-4 transform translate-x-0 bg-white opacity-20 rounded-full shadow-md p-4 flex justify-between"
                >
                    <a href="#" className="text-black flex-1 text-center">Пункт 1</a>
                    <a href="#" className="text-black flex-1 text-center">Пункт 2</a>
                    <a href="#" className="text-black flex-1 text-center">Пункт 3</a>
                    <a href="#" className="text-black flex-1 text-center">Пункт 4</a>
                </div>
            </div>
        </div>
    );
}

export default Home;
