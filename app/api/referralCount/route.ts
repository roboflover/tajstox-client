// referralCount
// app/api/referralCount/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const host = process.env.NEXT_PUBLIC_SERVER;

  // Извлечение JWT из cookies
  const jwtToken = req.cookies.get('jwtToken');

  if (!jwtToken) {
    // Возвращаем ошибку, если токен отсутствует
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await axios.get(`${host}/server/users/referralCount`, {
      headers: {
        Authorization: `Bearer ${jwtToken.value}`,
      },
    });

    // Возврат успешного ответа клиенту
    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error retrieving score:', error);

    // Возврат ошибки клиенту
    return NextResponse.json({ success: false, error: 'Failed to retrieve score.' }, { status: 500 });
  }
}
