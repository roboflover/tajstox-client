'use client'

import { useToken } from '@/app/contex/TokenContext';
import React, { useState, useEffect, useMemo, useImperativeHandle, forwardRef } from 'react';

function parseJwt(token: string) {
  try {
    console.log('Parsing JWT token:', token); // Лог входящего токена
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsedData = JSON.parse(jsonPayload);
    console.log('Parsed JWT payload:', parsedData); // Лог распарсенного payload
    return parsedData;
  } catch (error) {
    console.error('Error parsing JWT token:', error); // Лог ошибки при парсинге
    return null;
  }
}

type InviteFriendProps = object;

export interface InviteFriendRef {
  copyToClipboard: () => void;
  navigateToLink: () => void;
}

const InviteFriend = forwardRef<InviteFriendRef, InviteFriendProps>((props, ref) => {
  const { token } = useToken();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    console.log('Token from context:', token); // Лог токена из контекста
    if (token) {
      const userData = parseJwt(token);
      console.log('User data from token:', userData); // Лог данных пользователя
      if (userData?.telegramId) {
        setUserId(userData.telegramId);
        console.log('Set userId:', userData.telegramId); // Лог установки userId
      }
    }
  }, [token]);

  const referralLink = useMemo(() => {
    const link = userId ? `https://t.me/Tajstoxbot?startapp=${userId}` : '';
    console.log('Generated referral link:', link); // Лог сгенерированной реферальной ссылки
    return link;
  }, [userId]);

  const copyToClipboard = () => {
    console.log('Copy to clipboard triggered'); // Лог вызова функции копирования
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      console.log('Referral link copied:', referralLink); // Лог скопированной ссылки
      alert('Referral link copied to clipboard!');
    } else {
      console.warn('No referral link available to copy.'); // Лог предупреждения об отсутствии ссылки
      alert('No referral link available to copy.');
    }
  };

  const navigateToLink = () => {
    console.log('Navigate to link triggered'); // Лог вызова функции перехода по ссылке
    if (referralLink) {
      const encodedLink = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}`;
      console.log('Navigating to URL:', encodedLink); // Лог перехода по ссылке
      window.open(encodedLink, '_blank');
    } else {
      console.warn('No referral link available to navigate.'); // Лог предупреждения об отсутствии ссылки
      alert('No referral link available to navigate.');
    }
  };

  // Expose methods via the ref
  useImperativeHandle(ref, () => ({
    copyToClipboard,
    navigateToLink,
  }));

  return (
    <div>
      {/* Можно добавить UI для тестирования */}
      {/* <button onClick={copyToClipboard}>Copy Referral Link</button>
      <button onClick={navigateToLink}>Share Referral Link</button> */}
    </div>
  );
});

InviteFriend.displayName = 'InviteFriend';

export default InviteFriend;
