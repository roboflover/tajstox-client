// app/api/authenticate/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const host = process.env.NEXT_PUBLIC_SERVER;
  
  // // Создание экземпляра axios с базовой конфигурацией
  // const axiosInstance = axios.create({
  //   baseURL: host, // Замените на ваш актуальный базовый URL
  // });

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

  try {
    const body = await req.json();
    // const { initData } = body;

    if (!initData) {
      return NextResponse.json({ error: 'initData is missing' }, { status: 400 });
    }
    console.log(initData)
    const loginResponse = await userService.login(initData);

    return NextResponse.json(loginResponse, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
  
}

////////////////////////////////////////////////////
// Создание экземпляра axios с базовой конфигурацией
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8085', // Замените на ваш актуальный базовый URL
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
export type User = {
  id: number;
  telegramId: number;
  username: string;
}

export type LoginResponse = {
  user: User;
  token: string;
}

// Создание сервиса для взаимодействия с API
export const userService = {
  login: async (initData: string) => {
    const response = await axios.post<LoginResponse>(`/server/auth/authenticate`, {
      initData,
    });

    return response.data;
  },
  // getCurrentUser: async () => {
  //   const response = await axiosInstance.get<User>('/auth/me');

  //   return response.data;
  // },
};
