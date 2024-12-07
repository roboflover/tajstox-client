'use client'

import { useToken } from '@/app/contex/TokenContext';
import React, { useState, useEffect, useMemo } from 'react';

// Функция для декодирования JWT
function parseJwt(token: string) {
  try {
    console.log('Parsing JWT:', token); // Лог перед началом парсинга
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

    const parsedData = JSON.parse(jsonPayload);
    console.log('Parsed JWT Data:', parsedData); // Лог результата парсинга
    return parsedData;
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
      console.log('Token received from context:', token); // Лог токена из контекста
      const userData = parseJwt(token);
      if (userData?.telegramId) {
        console.log('User ID extracted from token:', userData.telegramId); // Лог извлеченного userId
        setUserId(userData.telegramId); // Устанавливаем ID пользователя из токена
      } else {
        console.warn('No user ID found in token'); // Лог если userId отсутствует
      }
    } else {
      console.warn('No token available in context'); // Лог если токен отсутствует
    }
  }, [token]);

  // Генерация реферальной ссылки с использованием userId
  const referralLink = useMemo(() => {
    if (userId) {
      const link = `${process.env.NEXT_PUBLIC_SITE_URL}/register?referralId=${userId}`;
      console.log('Generated referral link:', link); // Лог сгенерированной ссылки
      return link;
    }
    console.warn('User ID is not set, referral link cannot be generated'); // Лог если userId отсутствует
    return '';
  }, [userId]);

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied to clipboard!');
      console.log('Referral link copied to clipboard:', referralLink); // Лог успешного копирования
    } else {
      alert('No referral link available to copy.');
      console.warn('Attempted to copy an empty referral link'); // Лог если ссылка пустая
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
