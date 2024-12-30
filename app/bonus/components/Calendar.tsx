
import React, { useState, useEffect } from 'react';
import GradientCircle from './GradientCircle';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const daysWithBonuses: DayWithBonus[] = Array.from(
    { length: DAYS_COUNT },
    (_, i) => ({
      day: i + 1,
      bonus: calculateBonus(i + 1),
    })
  );

  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [bonus, setBonus] = useState<number>(0);
  console.log('bonus' ,bonus)
  const fetchActiveDay = async () => {
    try {
      const response = await axios.get('api/activeDay', {});
      setActiveDay(response.data.data.activeDay);
      console.log('activeDay', response.data.data.activeDay);
    } catch (error) {
      console.error('Error fetching active day:', error);
    }
  };

  useEffect(() => {
    fetchActiveDay();
  }, []);

  const handleNextDay = async (day: number, bonus: number) => {
    try {
      const currentBonus = day * 10;
      const response = await axios.post('api/updateDay', {
        day: day,
        bonus: bonus,
      });

      if (response.status === 200) {
        toast.success('Day completed!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });

        setBonus((prev) => prev + currentBonus);
        fetchActiveDay(); // Refresh the active day
      }
    } catch (error) {
      console.error('Error updating day:', error);

      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;

        if (status === 500) {
          toast.error('Day cannot be completed now', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
      }
    }
  };

  return (
    <div className="p-4 pt-8 flex flex-col items-center justify-center">
      <ToastContainer />
      <div className="mb-5">
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
          const isPurchased = day.day === activeDay;
          const isActive = day.day === activeDay;

          return (
            <button
              key={day.day}
              className={`flex flex-col items-center justify-center w-12 h-12 p-0 text-xs rounded-2xl border-2 ${
                isToday ? 'bg-blue-700' : 'bg-blue-900'
              } ${isPurchased || isActive ? 'border-green-500' : 'border-transparent'}`}
              onClick={() => handleNextDay(day.day, day.bonus)}
            >
              <div className="font-medium text-blue-100 text-xs">Day {day.day}</div>
              <GradientCircle />
              <div className="text-blue-100 text-xs">{day.bonus}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;