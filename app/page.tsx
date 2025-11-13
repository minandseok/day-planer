'use client';

import { useState } from 'react';
import { Calendar } from './domains/plan/components/Calendar';
import { PlanList } from './domains/plan/components/PlanList';
import { PlanFormModal } from './domains/plan/components/PlanFormModal';
import { ImportExportButtons } from './domains/plan/components/ImportExportButtons';
import { useCalendar } from './domains/plan/hooks/useCalendar';
import { usePlans } from './domains/plan/hooks/usePlans';

export default function Home() {
  const { currentYear, currentMonth, goToNextMonth, goToPreviousMonth, goToToday } = useCalendar();
  const { addPlan, deletePlan, getPlansForMonth, exportPlans, importPlans } = usePlans();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const currentMonthPlans = getPlansForMonth(currentYear, currentMonth);
  
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  const nextMonthPlans = getPlansForMonth(nextYear, nextMonth);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleAddPlan = (data: { title: string; description: string; startDate: string; endDate: string }) => {
    addPlan(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">📅 Day Planner</h1>
              <p className="text-sm text-gray-600 mt-1">달력에 계획을 작성하고 관리하세요</p>
            </div>
            <ImportExportButtons
              onExport={exportPlans}
              onImport={importPlans}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Calendar Section */}
          <Calendar
            year={currentYear}
            month={currentMonth}
            plans={currentMonthPlans}
            onPreviousMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
            onToday={goToToday}
            onDayClick={handleDayClick}
          />

          {/* Plans List Section */}
          <PlanList
            currentMonthPlans={currentMonthPlans}
            nextMonthPlans={nextMonthPlans}
            currentYear={currentYear}
            currentMonth={currentMonth}
            onDelete={deletePlan}
            onPreviousMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
            onToday={goToToday}
          />
        </div>
      </main>

      {/* Plan Form Modal */}
      <PlanFormModal
        isOpen={isModalOpen}
        selectedDate={selectedDate}
        onSubmit={handleAddPlan}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
