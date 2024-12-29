// app/api/users/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const host = process.env.NEXT_PUBLIC_SERVER;
  // Извлечение JWT из cookies
  const jwtToken = req.cookies.get('jwtToken');
  
  if(jwtToken)
  console.log(`Bearer ${jwtToken.value}`)

  if (!jwtToken) {
    // Возвращаем ошибку, если токен отсутствует
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { activeDay, currentBonus } = await req.json();
  
    // Формируем запрос
    const response = await axios.post(
      `${host}/server/progress/update-day`, // URL
      { // Тело запроса (body)
        day: activeDay,
        bonus: currentBonus,
      },
      { // Конфигурация (headers и другие настройки)
        headers: {
          Authorization: `Bearer ${jwtToken.value}`, // Корректная строка авторизации
        },
      }
    );
  
    console.log(response.data);
  
    // Возврат успешного ответа клиенту
    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error sending referral:', error);
  
    // Возврат ошибки клиенту
    return NextResponse.json(
      { success: false, error: 'Failed to update referral.' },
      { status: 500 }
    );
  }
  

// }
}
