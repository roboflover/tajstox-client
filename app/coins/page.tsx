'use client'

import { blue } from '@mui/material/colors';
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import Image from 'next/image'
import profilePic from './1win.jpg'

const Coins: React.FC = () => {

    return (
        <div className="space-y-6 mt-20 mr-5 ml-5"> {/* Дополнительно добавили отступ между строками */}
            {/* Строка со второй криптовалютой */}
            <div className="flex flex-col justify-center items-center">
                <div className="flex items-center ml-2 mb-2">
                    <MonetizationOn fontSize="large" sx={{ color: blue[500] }} />
                </div>
                <div className="flex items-center ml-2">
                    <span className="ml-2 font-semibold text-2xl">Earn more Tajstox</span>
                </div>
            </div>
    
            {/* Полупрозрачный прямоугольник с логотипом и описанием */}
            <div className="flex items-center bg-opacity-80 bg-gray-600 p-4 rounded-xl">
                {/* Круглое изображение логотипа криптовалюты */}
                <div className="flex-shrink-0">
                <Image
                        src={profilePic}
                        width={64}
                        height={64}
                        alt="Logo"
                        className='rounded-full ml-0'
                        />
                </div>
    
                {/* Описание задания */}
                <div className="ml-4">
                    <p className="text-lg font-medium text-gray-200">Join 1win Telegram channel</p>
                    <p className="text-lg font-medium text-gray-200">+150 000 Tajstox</p>

                </div>
            </div>
        </div>
    );
};

export default Coins;