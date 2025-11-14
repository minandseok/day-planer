'use client';

import {useState, useEffect} from 'react';
import type {Plan} from '../types';
import {isToday} from '../utils/dateUtils';
import {getColorClasses} from '../utils/colorUtils';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  plans: Plan[];
  onClick: () => void;
}

export function CalendarDay({
  date,
  isCurrentMonth,
  plans,
  onClick,
}: CalendarDayProps) {
  // 클라이언트에서만 오늘 날짜 판단 (빌드 시점 날짜 고정 방지)
  const [today, setToday] = useState(false);

  useEffect(() => {
    setToday(isToday(date));
  }, [date]);

  const dayNumber = date.getDate();
  const maxVisiblePlans = 3;
  const visiblePlans = plans.slice(0, maxVisiblePlans);
  const hasMorePlans = plans.length > maxVisiblePlans;

  return (
    <div
      onClick={onClick}
      className={`
        h-20 md:h-32 border border-gray-200 p-2 cursor-pointer transition-colors hover:bg-gray-50 overflow-hidden
        ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'}
      `}>
      <div className='flex items-center justify-between mb-1'>
        <span
          className={`
            text-sm font-medium
            ${
              today
                ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
                : ''
            }
          `}>
          {dayNumber}
        </span>
      </div>

      {/* 모바일: 작은 점으로 표시 (최대 3개, 세로 배치) */}
      <div className='flex flex-col gap-1 md:hidden'>
        {plans.slice(0, 3).map((plan) => {
          const color = plan.color || 'blue';
          // 색상별 진한 배경색 매핑
          const dotColors: Record<string, string> = {
            blue: 'bg-blue-500',
            purple: 'bg-purple-500',
            pink: 'bg-pink-500',
            rose: 'bg-rose-500',
            orange: 'bg-orange-500',
            amber: 'bg-amber-500',
            emerald: 'bg-emerald-500',
            teal: 'bg-teal-500',
            cyan: 'bg-cyan-500',
            indigo: 'bg-indigo-500',
          };
          const dotColor = dotColors[color] || 'bg-blue-500';

          return (
            <div
              key={plan.id}
              className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
              title={plan.title}
            />
          );
        })}
        {plans.length > 3 && (
          <span className='text-[10px] text-gray-600 font-medium leading-none'>
            +{plans.length - 3}
          </span>
        )}
      </div>

      {/* 데스크톱: 텍스트로 표시 (최대 3개 + 더보기) */}
      <div className='hidden md:block space-y-1 overflow-hidden'>
        {visiblePlans.map((plan) => {
          const colorClasses = getColorClasses(plan.color || 'blue');
          return (
            <div
              key={plan.id}
              className={`text-xs px-2 py-0.5 rounded truncate ${colorClasses.bg} ${colorClasses.text}`}
              title={plan.title}>
              {plan.title}
            </div>
          );
        })}
        {hasMorePlans && (
          <div className='text-xs text-gray-500 px-2'>
            +{plans.length - maxVisiblePlans}개 더
          </div>
        )}
      </div>
    </div>
  );
}
