'use client'

import React, { useState } from 'react';
import { ParticlesContainer } from './components/Particles';
import TelegramAuth from './components/TelegramAuth';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import LensBlurIcon from '@mui/icons-material/LensBlur';
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import HandshakeIcon from '@mui/icons-material/Handshake';

// Массив иконок
const icons = [
    AccountBalanceWalletIcon,
    HandshakeIcon,
    MonetizationOn,
    RocketLaunchIcon,
];

const pages = ['Wallet', 'Team', 'Сoins', 'Bonus']

const Home: React.FC = () => {
    const [score, setScore] = useState(0);
    const [firstName, setFirstName] = useState('Name');
    const [token, setToken] = useState('');
    const [level] = useState(1);
    const [team] = useState('Tajstox Command');

    const handleClick = async () => {
        try {
            const response = await axios.post('/api/setScore', {score}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data);
            setScore(response.data.data.data.score);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <TelegramAuth setFirstName={setFirstName} setScore={setScore} setToken={setToken} />
            <div
                className="flex items-center justify-center min-h-screen"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2), rgba(0, 0, 0, 0.2))',
                    zIndex: 10,
                }}
            >
                {/* Верхнее меню */}
                <div
                    style={{ left: "15px", right: "15px" }}
                    className="absolute top-4 transform translate-x-0 bg-gray-900 opacity-100 rounded-full shadow-md p-4 flex items-center"
                >
                    {/* Левый блок */}
                    <div className="flex justify-start items-center" style={{ width: "50%" }}>
                        <Avatar sx={{ bgcolor: grey[500], color: "black" }}>L {level}</Avatar>
                        <div className='justify-start '>
                            <p className="ml-2 text-xl text-white font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis z-10" style={{ maxWidth: "8ch" }}>
                                {firstName}
                            </p>
                            <p className="ml-2 text-xs text-white font-bold text-start whitespace-nowrap overflow-hidden text-ellipsis z-10 " style={{ maxWidth: "12ch" }}>
                                <span style={{ color: "blue" }}>2</span> TJX/day
                            </p>
                        </div>
                    </div>

                    {/* Центральный блок */}
                    <div className="relative h-12 flex justify-center items-center" style={{ width: "0", flexShrink: 0 }}>
                        <span className="h-full border-l border-white absolute" style={{ left: "50%", transform: "translateX(-50%)", height: "100%" }}></span>
                    </div>

                    {/* Правый блок */}
                    <div className="flex justify-start items-center pl-5" style={{ width: "50%" }}>
                        <Avatar sx={{ bgcolor: grey[500], color: "black" }}> <LensBlurIcon/> </Avatar>
                        <div className='justify-start '>
                            <p className="ml-2 text-l text-white font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis z-10 " style={{ maxWidth: "12ch" }}>
                                {team}
                            </p>
                            <p className="ml-2 text-xs text-white font-bold text-start whitespace-nowrap overflow-hidden text-ellipsis z-10 " style={{ maxWidth: "12ch" }}>
                                🔋 +1
                            </p>
                        </div>
                    </div>
                </div>

                {/* Контент */}
                <div className="text-center">
                    <div className="mb-4 text-2xl font-bold text-white">{score.toLocaleString('en-EN')}</div>
                    <button
                        onClick={handleClick}
                        className="w-16 h-16 text-white bg-blue-700 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-0"
                    >
                        +
                    </button>
                </div>

                {/* Нижнее меню */}
                <div
                    style={{ left: '15px', right: '15px' }}
                    className="absolute bottom-4 transform translate-x-0 bg-gray-800 rounded-full shadow-md p-4 flex justify-between"
                >
                    {pages.map((text, index) => {
                        const IconComponent = icons[index];
                        return (
                            <React.Fragment key={index}>
                                <div className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <IconComponent sx={{ color: "white" }} />
                                        <a href="#" className="text-white text-center mt-2 mx-2">{text}</a>
                                    </div>
                                    {index !== 3 && (
                                        <span
                                            className="border-l border-white mx-4"
                                            style={{
                                                height: "50%",
                                            }}
                                        ></span>
                                    )}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
