// referralCount
// app/api/referralCount/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const host = process.env.NEXT_PUBLIC_SERVER;
  console.log('Incoming request to /api/referralCount');

  // Извлечение JWT из cookies
  const jwtToken = req.cookies.get('jwtToken');

  if (!jwtToken) {
    console.error('JWT token not found in request cookies');
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  console.log('JWT token found, proceeding to fetch data');

  try {
    const response = await axios.get(`${host}/server/users/referralCount`, {
      headers: {
        Authorization: `Bearer ${jwtToken.value}`,
      },
    });

    console.log('Data successfully retrieved from the server', response.data);

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error retrieving score from server:', error);


    return NextResponse.json({ success: false, error: 'Failed to retrieve score.' }, { status: 500 });
  }
}