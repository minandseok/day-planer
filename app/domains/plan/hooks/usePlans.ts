'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Plan } from '../types';
import { exportPlansToFile } from '../utils/fileUtils';
import { getRandomColor } from '../utils/colorUtils';

const STORAGE_KEY = 'day-planner-plans';

function loadPlansFromStorage(): Plan[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load plans from storage:', error);
    return [];
  }
}

function savePlansToStorage(plans: Plan[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  } catch (error) {
    console.error('Failed to save plans to storage:', error);
  }
}

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedPlans = loadPlansFromStorage();
    setPlans(loadedPlans);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      savePlansToStorage(plans);
    }
  }, [plans, isLoaded]);

  const addPlan = useCallback((planData: Omit<Plan, 'id' | 'createdAt' | 'color'>) => {
    const newPlan: Plan = {
      ...planData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      color: getRandomColor(),
    };
    setPlans(prevPlans => [...prevPlans, newPlan]);
  }, []);

  const deletePlan = useCallback((id: string) => {
    setPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
  }, []);

  const updatePlan = useCallback((id: string, updates: Partial<Omit<Plan, 'id' | 'createdAt'>>) => {
    setPlans(prevPlans =>
      prevPlans.map(plan =>
        plan.id === id ? { ...plan, ...updates } : plan
      )
    );
  }, []);

  const getPlansForMonth = useCallback((year: number, month: number): Plan[] => {
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);

    return plans.filter(plan => {
      const planStart = new Date(plan.startDate);
      const planEnd = new Date(plan.endDate);

      return (
        (planStart >= monthStart && planStart <= monthEnd) ||
        (planEnd >= monthStart && planEnd <= monthEnd) ||
        (planStart <= monthStart && planEnd >= monthEnd)
      );
    }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [plans]);

  const getPlansForDate = useCallback((date: Date): Plan[] => {
    const dateTime = date.getTime();
    const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const dateEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).getTime();

    return plans.filter(plan => {
      const planStart = new Date(plan.startDate).getTime();
      const planEnd = new Date(plan.endDate).getTime();

      return planStart <= dateEnd && planEnd >= dateStart;
    });
  }, [plans]);

  const exportPlans = useCallback(() => {
    exportPlansToFile(plans);
  }, [plans]);

  const importPlans = useCallback((importedPlans: Plan[], mode: 'merge' | 'replace') => {
    if (mode === 'replace') {
      // 색상이 없는 계획에 색상 추가
      const plansWithColor = importedPlans.map(plan => ({
        ...plan,
        color: plan.color || getRandomColor(),
      }));
      setPlans(plansWithColor);
    } else {
      // 병합 모드: 기존 ID와 중복되지 않도록 처리
      const existingIds = new Set(plans.map(p => p.id));
      const newPlans = importedPlans.map(plan => {
        const updatedPlan = { ...plan, color: plan.color || getRandomColor() };
        if (existingIds.has(plan.id)) {
          // ID 중복 시 새 ID 생성
          return { ...updatedPlan, id: crypto.randomUUID() };
        }
        return updatedPlan;
      });
      setPlans(prevPlans => [...prevPlans, ...newPlans]);
    }
  }, [plans]);

  const replaceAllPlans = useCallback((newPlans: Plan[]) => {
    setPlans(newPlans);
  }, []);

  return {
    plans,
    addPlan,
    deletePlan,
    updatePlan,
    getPlansForMonth,
    getPlansForDate,
    exportPlans,
    importPlans,
    replaceAllPlans,
  };
}

