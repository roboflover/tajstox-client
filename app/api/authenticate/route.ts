import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  console.log('authHeader', authHeader)
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
  // console.log(initData)
  try {

    if (!initData) {
      return NextResponse.json({ error: 'initData is missing' }, { status: 400 });
    }

    const loginResponse = await userService.login(initData);
    console.log(loginResponse)
    return NextResponse.json(loginResponse, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
  
}

const host = process.env.NEXT_PUBLIC_SERVER;
// Создание экземпляра axios с базовой конфигурацией
const axiosInstance = axios.create({
  baseURL: host, // Замените на ваш актуальный базовый URL
});

// Настройка интерсепторов для axiosInstance
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') { // Проверяем, что код выполняется в браузере
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Определение типов данных
type User = {
  id: number;
  telegramId: number;
  username: string;
}

type LoginResponse = {
  user: User;
  token: string;
}

// Создание сервиса для взаимодействия с API
const userService = {
  login: async (initData: string) => {

    const response = await axios.post<LoginResponse>(`${host}/server/auth/authenticate`, {
      initData,
    });
    
    return response.data;
  },

};
