import { useToken } from '@/app/contex/TokenContext'

import React, { useState, useEffect } from 'react';

// Функция для декодирования JWT
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) throw new Error('Invalid JWT');
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
  console.log('token', token)
  useEffect(() => {
    if (token) {
      console.log('token invite JWT', token)
      const userData = parseJwt(token);
      setUserId(userData?.id);
    }
  }, [token]);

  const referralLink = `${process.env.NEXT_PUBLIC_SITE_URL}/register?referralId=${userId}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
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
