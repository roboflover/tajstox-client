import React, { useState, useEffect } from 'react';
import GradientCircle from './GradientCircle';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import { blue } from '@mui/material/colors';
import axios from 'axios';

// Тип для структуры дня с бонусами
interface DayWithBonus {
  day: number;
  bonus: number;
}

const DAYS_COUNT = 15; // Фиксированное количество дней

// Функция для расчета бонуса по алгоритму
const calculateBonus = (day: number): number => {
  const bonus = day * 11; // Бонус увеличивается на 11 каждый день
  return bonus > 120 ? 120 : bonus; // Ограничиваем максимальное значение бонуса до 120
};

const handleButtonClick = (day: DayWithBonus) => {
  console.log(`Clicked on Day ${day.day}, ${day.bonus}`);
};



const Calendar: React.FC = () => {

  const [purchasedDay, setPurchasedDay] = useState<number | null>(null); // Состояние для купленного дня

  // Генерация массива с фиксированным количеством дней и бонусами
  const daysWithBonuses: DayWithBonus[] = Array.from({ length: DAYS_COUNT }, (_, i) => ({
    day: i + 1,
    bonus: calculateBonus(i + 1), // Используем функцию расчета бонуса
  }));

  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [bonus, setBonus] = useState<number>(0);
  // const userId = 'user123'; // Уникальный ID пользователя

  useEffect(() => {
    // Получаем активный день при загрузке страницы
    const fetchActiveDay = async () => {
      try {
        const response = await axios.get(`api/activeDay`, {});
        setActiveDay(response.data.activeDay);
      } catch (error) {
        console.error('Error fetching active day:', error);
      }
    };

    fetchActiveDay();
  }, []);


  return (
    <div className="p-4 pt-8 flex flex-col items-center justify-center">
      <div className='mb-5'>
        <CalendarMonthSharpIcon  fontSize="large" sx={{ color: blue[500]}} />
      </div>

      <h2 className="text-center text-2xl font-semibold text-blue-200 mb-4">
        Daily reward
      </h2>
      <p className="text-center text-sm text-gray-400 mb-10">
        Description of the daily reward goes here in smaller font.
      </p>
      {/* Контейнер для календаря */}
      <div className="flex flex-wrap gap-3 justify-center">
        {daysWithBonuses.map((day) => {
          // Проверяем, является ли текущий день сегодняшним
          const today = new Date();
          const isToday = day.day === today.getDate();

          // Проверяем, является ли день купленным
          const isPurchased = day.day === purchasedDay;

          return (
            <button
              key={day.day}
              className={`flex flex-col items-center justify-center w-16 h-16 p-2 text-xs rounded-2xl border-2 ${
                isToday ? 'bg-blue-700' : 'bg-blue-900'
              } ${isPurchased ? 'border-green-500' : 'border-transparent'}`}
              onClick={() => handleButtonClick(day)}
            >
              <div className="font-medium text-blue-100">Day {day.day}</div>
              <GradientCircle />
              <div className="text-blue-100">{day.bonus}</div>
            </button>
          );
        })}
      </div>
      {/* Кнопка Claim */}
      <div className="flex justify-center items-start">
        <button className="px-20 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-20">
          Claim
        </button>
      </div>
    </div>
  );
};

export default Calendar;
