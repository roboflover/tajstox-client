// app/api/users/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const host = process.env.NEXT_PUBLIC_SERVER;

  try {
    // Парсинг тела запроса
    const { score, telegramId } = await req.json();

    // Отправка данных на сервер вашего приложения
    const response = await axios.patch(`${host}/server/users/upscore`, {
      score, telegramId
    });

    // Возврат успешного ответа клиенту
    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error sending score:', error);

    // Возврат ошибки клиенту
    return NextResponse.json({ success: false, error: 'Failed to update score.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const host = process.env.NEXT_PUBLIC_SERVER;

  try {
    // Парсинг тела запроса не нужен для GET-запросов. GET-запросы получают данные из строки запроса (query string).
    const { searchParams } = new URL(req.url);
    const telegramId = searchParams.get('telegramId');

    // Отправка данных на сервер вашего приложения
    const response = await axios.get(`${host}/server/users/score`, {
      params: {
        telegramId: telegramId,
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