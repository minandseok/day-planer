'use client';

import { useState } from 'react';
import type { Plan } from '../types';
import { getColorClasses } from '../utils/colorUtils';
import { DeleteConfirmModal } from './DeleteConfirmModal';

interface PlanCardProps {
  plan: Plan;
  onDelete: (id: string) => void;
}

export function PlanCard({ plan, onDelete }: PlanCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const startDate = new Date(plan.startDate);
  const endDate = new Date(plan.endDate);
  const colorClasses = getColorClasses(plan.color || 'blue');
  
  const formatDisplayDate = (date: Date): string => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(plan.id);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={`border-l-4 rounded-lg p-4 hover:shadow-md transition-shadow ${colorClasses.bg} ${colorClasses.border}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`font-semibold mb-1 ${colorClasses.text}`}>{plan.title}</h3>
          
          <div className={`flex items-center gap-2 text-sm mb-2 ${colorClasses.text}`}>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDisplayDate(startDate)} ~ {formatDisplayDate(endDate)}
            </span>
          </div>

          {plan.description && (
            <p className={`text-sm line-clamp-2 ${colorClasses.text} opacity-80`}>{plan.description}</p>
          )}
        </div>

        <button
          onClick={handleDeleteClick}
          className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="삭제"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        plan={plan}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}

