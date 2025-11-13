'use client';

import {useEffect} from 'react';

interface ImportModalProps {
  isOpen: boolean;
  fileName: string;
  planCount: number;
  onConfirm: (mode: 'merge' | 'replace') => void;
  onCancel: () => void;
}

export function ImportModal({
  isOpen,
  fileName,
  planCount,
  onConfirm,
  onCancel,
}: ImportModalProps) {
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
        onClick={onCancel}
      />

      {/* Modal */}
      <div className='relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-10'>
        <div className='mb-4'>
          <h2 className='text-xl font-bold text-gray-900 mb-2'>
            계획 가져오기
          </h2>
          <p className='text-sm text-gray-600'>
            <span className='font-medium'>{fileName}</span> 파일에서 {planCount}
            개의 계획을 가져옵니다.
          </p>
        </div>

        <div className='mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md'>
          <p className='text-sm text-yellow-800'>
            <strong>⚠️ 주의:</strong> 가져오기 방식을 선택해주세요.
          </p>
        </div>

        <div className='space-y-3'>
          <button
            onClick={() => onConfirm('merge')}
            className='w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium text-left'>
            <div className='flex items-start gap-3'>
              <svg
                className='w-6 h-6 shrink-0 mt-0.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
              <div>
                <div className='font-semibold'>기존 계획과 병합</div>
                <div className='text-sm text-blue-100 mt-1'>
                  기존 계획을 유지하고 새 계획을 추가합니다.
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => onConfirm('replace')}
            className='w-full px-4 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium text-left'>
            <div className='flex items-start gap-3'>
              <svg
                className='w-6 h-6 shrink-0 mt-0.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
              <div>
                <div className='font-semibold'>기존 계획 덮어쓰기</div>
                <div className='text-sm text-red-100 mt-1'>
                  기존 계획을 모두 삭제하고 새 계획으로 교체합니다.
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={onCancel}
            className='w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium'>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
