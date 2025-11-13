'use client';

import { PlanCard } from './PlanCard';
import type { Plan } from '../types';

interface PlanListProps {
  currentMonthPlans: Plan[];
  nextMonthPlans: Plan[];
  currentYear: number;
  currentMonth: number;
  onDelete: (id: string) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export function PlanList({
  currentMonthPlans,
  nextMonthPlans,
  currentYear,
  currentMonth,
  onDelete,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: PlanListProps) {
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  return (
    <div className="space-y-8">
      {/* 월 네비게이션 */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {currentYear}년 {monthNames[currentMonth]}
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
      </div>

      {/* 현재 달 계획 */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {currentYear}년 {monthNames[currentMonth]} 계획
          </h2>
          <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
            {currentMonthPlans.length}개
          </span>
        </div>
        {currentMonthPlans.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">이번 달에 등록된 계획이 없습니다.</p>
            <p className="text-sm text-gray-400 mt-1">달력의 날짜를 클릭하여 계획을 추가해보세요.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {currentMonthPlans.map(plan => (
              <PlanCard key={plan.id} plan={plan} onDelete={onDelete} />
            ))}
          </div>
        )}
      </section>

      {/* 다음 달 계획 */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {nextYear}년 {monthNames[nextMonth]} 계획
          </h2>
          <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
            {nextMonthPlans.length}개
          </span>
        </div>
        {nextMonthPlans.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">다음 달에 등록된 계획이 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {nextMonthPlans.map(plan => (
              <PlanCard key={plan.id} plan={plan} onDelete={onDelete} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

