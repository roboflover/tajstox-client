
import React, { useState, useEffect } from 'react';

// Функция для декодирования JWT
function parseJwt(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Failed to parse JWT", error);
        return null;
    }
}

// Функция для получения JWT из cookies
function getJwtTokenFromCookies() {
    const name = "jwtToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

const InviteFriend: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = getJwtTokenFromCookies();
    console.log(token)
    if (token) {
      const userData = parseJwt(token);
      setUserId(userData?.id);
    }
  }, []);
  
  const referralLink = `${process.env.NEXT_PUBLIC_SITE_URL}/register?referralId=${userId}`;
  console.log(referralLink)
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