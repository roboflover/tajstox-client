'use client'

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface RegisterResponse {
  message: string;
  [key: string]: any; // для дополнительных данных в ответе
}

export default function Register() {

  const router = useRouter();
  const [telegramId, setTelegramId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [authPayload, setAuthPayload] = useState<string>('');
  const [referralId, setReferralId] = useState<string | null>(null);

  useEffect(() => {
    // Извлекаем referralId из URL
    const { referralId } = router.query;
    if (typeof referralId === 'string') {
      setReferralId(referralId);
      console.log(referralId)
    }
    
  }, [router.query, referralId]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    // try {
    //   const response = await fetch('/api/auth/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ telegramId, username, firstName, authPayload, referralId }),
    //   });

    //   const data: RegisterResponse = await response.json();

    //   if (response.ok) {
    //     console.log('User registered successfully:', data);
    //   } else {
    //     console.error('Error registering user:', data.message);
    //   }
    // } catch (error) {
    //   console.error('Unexpected error during registration:', error);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Telegram ID"
        value={telegramId}
        onChange={(e) => setTelegramId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Auth Payload"
        value={authPayload}
        onChange={(e) => setAuthPayload(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}
