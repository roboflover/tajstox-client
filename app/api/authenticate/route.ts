import axios from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {

  const initData = req.nextUrl.searchParams.get('initData');
  
  if (!initData) {
    return new Response(JSON.stringify({ error: 'initData is missing' }), { status: 400 });
  }

  try {
    await axios.get('http://localhost:8085/server/auth/authenticate', {
      params: {
        initData: initData
      }
    });
} catch (error) {    
    console.error('Authentication failed:', error);       
    return new Response(JSON.stringify({ error: 'Authentication failed' }), { status: 500 });
}
    

  // Добавьте здесь логику обработки, если initData существует
  // Например, если вы хотите вернуть успешный ответ:
  return new Response(JSON.stringify({ message: 'initData received successfully', data: initData }), { status: 200 });
}


