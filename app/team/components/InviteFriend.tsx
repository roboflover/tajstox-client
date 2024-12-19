
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
  shareOnTelegram: () => void;
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
    () => (userId ? `https://t.me/Tajstoxbot?startapp=${userId}` : ''),
    [userId]
  );

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink).then(() => {
        alert('Referral link copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy referral link.');
      });
    } else {
      alert('No referral link available to copy.');
    }
  };

  const shareOnTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}`;
    window.open(telegramUrl, '_blank');
  };

  // Expose methods via the ref
  useImperativeHandle(ref, () => ({
    copyToClipboard,
    shareOnTelegram,
  }));

  return (
    <div>

    </div>
  );
});

InviteFriend.displayName = 'InviteFriend';

export default InviteFriend;