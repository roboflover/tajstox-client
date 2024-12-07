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
    () => (userId ? `${process.env.NEXT_PUBLIC_SITE_URL}/register?referralId=${userId}` : ''),
    [userId]
  );

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied to clipboard!');
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
});

InviteFriend.displayName = 'InviteFriend';

export default InviteFriend;
