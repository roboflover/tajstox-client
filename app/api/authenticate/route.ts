// app/api/authenticate/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

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

  console.log('Init Data:', initData);

  // Здесь вы можете добавить дополнительную логику для обработки initData

  return NextResponse.json(
    { message: 'Authorization data received successfully' },
    { status: 200 }
  );
}
