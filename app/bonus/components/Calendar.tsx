import React, { useState, useEffect } from 'react';
import GradientCircle from './GradientCircle';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import { blue } from '@mui/material/colors';
import axios from 'axios';

interface DayWithBonus {
  day: number;
  bonus: number;
}

const DAYS_COUNT = 15;

const calculateBonus = (day: number): number => {
  const bonus = day * 11;
  return bonus > 120 ? 120 : bonus;
};

const Calendar: React.FC = () => {
  const [purchasedDay, setPurchasedDay] = useState<number | null>(null);
  const daysWithBonuses: DayWithBonus[] = Array.from({ length: DAYS_COUNT }, (_, i) => ({
    day: i + 1,
    bonus: calculateBonus(i + 1),
  }));

  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [bonus, setBonus] = useState<number>(0);

  useEffect(() => {
    const fetchActiveDay = async () => {
      try {
        const response = await axios.get('api/activeDay', {});
        setActiveDay(response.data.activeDay);
      } catch (error) {
        console.error('Error fetching active day:', error);
      }
    };

    fetchActiveDay();
  }, []);

  useEffect(() => {
    console.log('bonus', bonus)
    console.log('activeDay', activeDay)
  }, [setActiveDay, setBonus]);


  const handleNextDay = async (day: number, bonus: number) => {
    try {
      const currentBonus = day * 10;

      const response = await axios.post('api/updateDay', {
        day: day,
        bonus: bonus,
      });

      setBonus((prev) => prev + currentBonus);
      setActiveDay(response.data.nextDay);
      setPurchasedDay(day);  // Установите купленный день

    } catch (error) {
      console.error('Error updating day:', error);
    }
  };

  return (
    <div className="p-4 pt-8 flex flex-col items-center justify-center">
      <div className='mb-5'>
        <CalendarMonthSharpIcon fontSize="large" sx={{ color: blue[500] }} />
      </div>

      <h2 className="text-center text-2xl font-semibold text-blue-200 mb-4">
        Daily reward
      </h2>
      <p className="text-center text-sm text-gray-400 mb-10">
        Description of the daily reward goes here in smaller font.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {daysWithBonuses.map((day) => {
          const today = new Date();
          const isToday = day.day === today.getDate();
          const isPurchased = day.day === purchasedDay;

          return (
            <button
              key={day.day}
              className={`flex flex-col items-center justify-center w-12 h-12 p-0 text-xs rounded-2xl border-2 ${
                isToday ? 'bg-blue-700' : 'bg-blue-900'
              } ${isPurchased ? 'border-green-500' : 'border-transparent'}`}
              onClick={() => handleNextDay(day.day, day.bonus)}
            >
              <div className="font-medium text-blue-100 text-xs">Day {day.day}</div>
              <GradientCircle />
              <div className="text-blue-100 text-xs">{day.bonus}</div>
            </button>
          );
        })}
      </div>
      <div className="flex justify-center items-start">
        <button className="px-20 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-5">
          Claim
        </button>
      </div>
    </div>
  );
};

export default Calendar;
