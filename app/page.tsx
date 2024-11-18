'use client'
import React, { useState } from 'react';
import { ParticlesContainer } from './components/Particles'; // предположим, что вы уже обернули этот компонент в React.memo
import TelegramAuth from './components/TelegramAuth';

const Home: React.FC = () => {
    const [score, setScore] = useState(0);
    const [firstName, setFirstName] = useState(''); // Добавляем состояние для firstName

    const handleClick = () => {
        setScore(score + 1);
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {/* Передаем функцию для обновления firstName в TelegramAuth */}
            <TelegramAuth setFirstName={setFirstName} />
            <ParticlesContainer />
            <div
                className="flex items-center justify-center min-h-screen"
                style={{
                    background: 'radial-gradient(circle, #3b82f6, #000000)',
                    backgroundPosition: 'center',
                }}
            >
                <div className="text-center">
                    <div className="mb-4 text-2xl font-bold text-white">Привет: {firstName}</div>
                    <div className="mb-4 text-2xl font-bold text-white">Очки: {score}</div>
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