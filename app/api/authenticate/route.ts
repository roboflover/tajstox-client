// app/api/authenticate/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const host = process.env.NEXT_PUBLIC_SERVER;

  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header is missing' }, { status: 400 });
  }

  const [authType, initData] = authHeader.split(' ');

  if (authType !== 'tma' || !initData) {
    return NextResponse.json(
      { error: 'Invalid authorization scheme or data' },
      { status: 401 }
    );
  }

  const authHeader2 = `tma ${authHeader}`;
  try {
    const response = await axios.post(`${host}/server/auth/authenticate`, {}, { // используйте правильный адрес и порт для вашего сервера
      headers: {
        'Authorization': authHeader2,
      },
    });

    return new Response(response.data, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(error?.response?.data || 'Unknown error', {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

}
