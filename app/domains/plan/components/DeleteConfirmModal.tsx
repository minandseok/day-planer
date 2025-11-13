'use client';

import {useEffect} from 'react';
import type {Plan} from '../types';
import {getColorClasses} from '../utils/colorUtils';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  plan: Plan | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  plan,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
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

  if (!isOpen || !plan) return null;

  const colorClasses = getColorClasses(plan.color || 'blue');
  const startDate = new Date(plan.startDate);
  const endDate = new Date(plan.endDate);

  const formatDisplayDate = (date: Date): string => {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-opacity-30 transition-opacity'
        onClick={onCancel}
      />

      {/* Modal */}
      <div className='relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-10'>
        <div className='mb-4'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>
              <svg
                className='w-6 h-6 text-red-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
            </div>
            <div>
              <h2 className='text-xl font-bold text-gray-900'>계획 삭제</h2>
              <p className='text-sm text-gray-500'>
                이 작업은 되돌릴 수 없습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 삭제할 계획 정보 */}
        <div
          className={`p-4 rounded-lg mb-6 border-l-4 ${colorClasses.bg} ${colorClasses.border}`}>
          <h3 className={`font-semibold mb-2 ${colorClasses.text}`}>
            {plan.title}
          </h3>
          <p className={`text-sm ${colorClasses.text}`}>
            {formatDisplayDate(startDate)} ~ {formatDisplayDate(endDate)}
          </p>
          {plan.description && (
            <p className={`text-sm mt-2 ${colorClasses.text} opacity-80`}>
              {plan.description}
            </p>
          )}
        </div>

        <div className='bg-red-50 border border-red-200 rounded-md p-3 mb-6'>
          <p className='text-sm text-red-800'>
            <strong>⚠️ 주의:</strong> 이 계획을 삭제하시겠습니까? 삭제 후에는
            복구할 수 없습니다.
          </p>
        </div>

        <div className='flex gap-3'>
          <button
            onClick={onCancel}
            className='flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium'>
            취소
          </button>
          <button
            onClick={onConfirm}
            className='flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium'>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
