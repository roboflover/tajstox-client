'use client'

import { useToken } from '@/app/contex/TokenContext';
import React, { useState, useEffect, useMemo } from 'react';

// Функция для декодирования JWT
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to parse JWT', error);
    return null;
  }
}

const InviteFriend: React.FC = () => {
  const { token } = useToken(); // Получаем токен из контекста
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      console.log('Token:', token);
      const userData = parseJwt(token);
      if (userData?.id) {
        setUserId(userData.id); // Устанавливаем ID пользователя из токена
      }
    }
  }, [token]);

  // Генерация реферальной ссылки с использованием userId
  const referralLink = useMemo(() => {
    if (userId) {
      return`${process.env.NEXT_PUBLIC_SITE_URL}/register?referralId=${userId}`;
    }
    return '';
  }, [userId]);

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied to clipboard!');
    } else {
      alert('No referral link available to copy.');
    }
  };

  return (
    <div>
      <p>Invite a friend using this referral link:</p>
      <input
        type="text"
        value={referralLink}
        readOnly
        style={{ backgroundColor: 'black', color: 'white' }}
      />
      <button onClick={copyToClipboard} className="copy-button">
        Copy Referral Link
      </button>
    </div>
  );
};

export default InviteFriend;
