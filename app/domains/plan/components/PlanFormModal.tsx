'use client';

import {useEffect} from 'react';
import {PlanForm} from './PlanForm';

interface PlanFormModalProps {
  isOpen: boolean;
  selectedDate?: Date;
  onSubmit: (data: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => void;
  onClose: () => void;
}

export function PlanFormModal({
  isOpen,
  selectedDate,
  onSubmit,
  onClose,
}: PlanFormModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-opacity-30 transition-opacity'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-10'>
        <div className='mb-4'>
          <h2 className='text-xl font-bold text-gray-900'>새 계획 추가</h2>
          {selectedDate && (
            <p className='text-sm text-gray-500 mt-1'>
              {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{' '}
              {selectedDate.getDate()}일
            </p>
          )}
        </div>

        <PlanForm
          initialDate={selectedDate}
          onSubmit={(data) => {
            onSubmit(data);
            onClose();
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
