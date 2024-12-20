'use client'

import HandshakeIcon from '@mui/icons-material/Handshake';
import { blue } from '@mui/material/colors';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InviteFriend, { InviteFriendRef } from './components/InviteFriend';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Team: React.FC = () => {

    const inviteFriendRef = useRef<InviteFriendRef>(null);
    const [referralCount, setReferralCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/referralCount');
                setReferralCount(response.data.referralCount); // Предполагаем, что сервер возвращает referralCount
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []); 

    const handleCopyClick = () => {
        if (inviteFriendRef.current) {
          inviteFriendRef.current.copyToClipboard();
        }
      };
      
    const handleLinkClick = () => {
    if (inviteFriendRef.current) {
        inviteFriendRef.current.navigateToLink();
    }
    };
    

    return (
        <div className="space-y-6 mt-20 mr-5 ml-5">  {/* Дополнительно добавили отступ между строками */}
            <InviteFriend ref={inviteFriendRef} />
            {/* Строка со свторой криптовалютой */}
            <div className="flex flex-col justify-center items-center">
                <div className="flex items-center ml-2 mb-2">
                    <HandshakeIcon  fontSize="large" sx={{ color: blue[500]}} />
                </div>
                <div className="flex items-center ml-2 ">
                <span className="ml-2  font-semibold text-2xl">0 {referralCount} Friends</span>
                </div>
            </div>
            {/* Существующая центральная кнопка */}
            <div className="flex justify-center items-center">
                <button onClick={handleLinkClick} className="flex items-center px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-20 space-x-2">
                    {/* Текст */}
                    <span>Invite a friend</span>
                </button>
                <button 
                    onClick={handleCopyClick}
                    className="flex items-center px-2 py-3 ml-2 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-20 space-x-2">
                <ContentCopyIcon/>
                </button>
            </div>
        </div>
    );
};

export default Team;