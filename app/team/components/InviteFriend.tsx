'use client'

import { useToken } from '@/app/contex/TokenContext';
import React, { useState, useEffect, useMemo, useImperativeHandle, forwardRef } from 'react';

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

type InviteFriendProps = object;

export interface InviteFriendRef {
  copyToClipboard: () => void;
}

const InviteFriend = forwardRef<InviteFriendRef, InviteFriendProps>((props, ref) => {
  const { token } = useToken();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      const userData = parseJwt(token);
      if (userData?.telegramId) setUserId(userData.telegramId);
    }
  }, [token]);

  const referralLink = useMemo(
    () => (userId ? `https://t.me/share/url?url=https://t.me/Tajstoxbot?startapp=${userId}` : ''),
    [userId]
  );
  // https://t.me/share/url?url=https://t.me/Tajstoxbot?startapp=${userId}&text=${encodedText}
  const copyToClipboard = () => {

    console.log('Window.Telegram:', window.Telegram);
    if (window.Telegram?.WebApp?.shareText) {
      console.log('Sharing through Telegram WebApp');
      window.Telegram.WebApp.shareText(referralLink);
    } else {
      console.log('Falling back to clipboard sharing');
      navigator.clipboard.writeText(referralLink).then(() => {
        alert('Referral link copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy referral link.');
      });
    }


    if (referralLink) {
      // Проверяем, доступен ли Telegram WebApp API
      if (window.Telegram?.WebApp?.shareText) {
        window.Telegram.WebApp.shareText(referralLink);
      } else {
        // Если Telegram WebApp API недоступен, копируем ссылку в буфер обмена
        navigator.clipboard.writeText(referralLink).then(() => {
          alert('Referral link copied to clipboard!');
        }).catch(() => {
          alert('Failed to copy referral link.');
        });
      }
    } else {
      alert('No referral link available to copy.');
    }
  };

  // Expose the copyToClipboard method via the ref
  useImperativeHandle(ref, () => ({
    copyToClipboard,
  }));

  return (
    <div>

    </div>
  );
});

InviteFriend.displayName = 'InviteFriend';

export default InviteFriend;
