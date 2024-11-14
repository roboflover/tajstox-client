import axios from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const initData = req.nextUrl.searchParams.get('initData'); // Получение параметра initData из URL
  
  console.log(initData);
  
  if (!initData) {
    return new Response(JSON.stringify({ error: 'initData is missing' }), { status: 400 });
  }

  // Добавьте здесь логику обработки, если initData существует
  // Например, если вы хотите вернуть успешный ответ:
  return new Response(JSON.stringify({ message: 'initData received successfully', data: initData }), { status: 200 });
}
