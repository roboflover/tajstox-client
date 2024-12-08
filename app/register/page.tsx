'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { authenticateUser, addReferralLink } from '../services/apiService';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

export default function Register() {
  const searchParams = useSearchParams();

  const [referralId, setReferralId] = useState<string | null>(null);

  const sendInitDataToServer = useCallback(async () => {
    if (!referralId) {
      // Если referralId отсутствует, не выполняем запрос
      return;
    }

    try {
      // Получаем данные запуска Telegram
      const { initDataRaw } = retrieveLaunchParams();

      // Аутентифицируем пользователя
      const { token } = await authenticateUser(initDataRaw);

      // Сохраняем токен в cookie
      document.cookie = `jwtToken=${token}; path=/; Secure; SameSite=Strict`;
      
      // Загружаем реферальную ссылку на сервер
      const result = await addReferralLink(token, referralId);
      console.log('Referral link added successfully:', result);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  }, [referralId]);

  useEffect(() => {
    // Проверяем наличие referralId в параметрах URL
    const referralIdFromParams = searchParams.get('referralId');
    if (typeof referralIdFromParams === 'string') {
      setReferralId(referralIdFromParams);
    }
  }, [searchParams]);

  useEffect(() => {
    // Отправляем данные на сервер только после установки referralId
    sendInitDataToServer();
  }, [sendInitDataToServer]);

  return <div></div>;
}
