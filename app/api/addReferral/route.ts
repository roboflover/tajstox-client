// app/api/users/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const host = process.env.NEXT_PUBLIC_SERVER;
  // Извлечение JWT из cookies
  const jwtToken = req.cookies.get('jwtToken');

  if (!jwtToken) {
    // Возвращаем ошибку, если токен отсутствует
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Парсинг тела запроса
    const { referralCode } = await req.json();
    console.log(`referralCode Bearer ${jwtToken.value}`)
    // Отправка данных на сервер вашего приложения
    const response = await axios.post(`${host}/server/users/addReferral`, {referralCode}, {
        headers: {
          Authorization: `Bearer ${jwtToken.value}`,
        },
      }
    );
    // console.log(response.data)
    // Возврат успешного ответа клиенту
    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error sending referral:', error);

    // Возврат ошибки клиенту
    return NextResponse.json({ success: false, error: 'Failed to update referal.' }, { status: 500 });
  }
}
