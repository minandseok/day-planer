'use client';

import { CalendarDay } from './CalendarDay';
import { getMonthDays, getDayName, getMonthName } from '../utils/dateUtils';
import type { Plan } from '../types';

interface CalendarProps {
  year: number;
  month: number;
  plans: Plan[];
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onDayClick: (date: Date) => void;
}

export function Calendar({
  year,
  month,
  plans,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onDayClick,
}: CalendarProps) {
  const days = getMonthDays(year, month);
  const weekDays = [0, 1, 2, 3, 4, 5, 6];

  const getPlansForDate = (date: Date): Plan[] => {
    const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const dateEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).getTime();

    return plans.filter(plan => {
      const planStart = new Date(plan.startDate).getTime();
      const planEnd = new Date(plan.endDate).getTime();
      return planStart <= dateEnd && planEnd >= dateStart;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {year}년 {getMonthName(month)}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onToday}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            오늘
          </button>
          <button
            onClick={onPreviousMonth}
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            aria-label="이전 달"
          >
            ←
          </button>
          <button
            onClick={onNextMonth}
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            aria-label="다음 달"
          >
            →
          </button>
        </div>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map(day => (
          <div
            key={day}
            className={`
              text-center text-sm font-semibold py-2
              ${day === 0 ? 'text-red-600' : day === 6 ? 'text-blue-600' : 'text-gray-700'}
            `}
          >
            {getDayName(day)}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0 border-t border-l border-gray-200">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month;
          const plansForDate = getPlansForDate(date);
          
          return (
            <CalendarDay
              key={index}
              date={date}
              isCurrentMonth={isCurrentMonth}
              plans={plansForDate}
              onClick={() => onDayClick(date)}
            />
          );
        })}
      </div>
    </div>
  );
}

