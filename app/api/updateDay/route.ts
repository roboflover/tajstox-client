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

    const response = await axios.get(`${host}/server/progress/update-day`, {
        headers: {
          Authorization: `Bearer ${jwtToken.value}`,
        },
      params: {
        day: activeDay,
        bonus: currentBonus,
      },
    },
    );
    console.log(response.data)
    // Возврат успешного ответа клиенту
    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error sending referral:', error);

    // Возврат ошибки клиенту
    return NextResponse.json({ success: false, error: 'Failed to update referal.' }, { status: 500 });
  }

// }
}
