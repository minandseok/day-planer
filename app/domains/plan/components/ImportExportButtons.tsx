'use client';

import { useRef, useState } from 'react';
import { importPlansFromFile } from '../utils/fileUtils';
import { ImportModal } from './ImportModal';
import type { Plan } from '../types';

interface ImportExportButtonsProps {
  onExport: () => void;
  onImport: (plans: Plan[], mode: 'merge' | 'replace') => void;
}

export function ImportExportButtons({ onExport, onImport }: ImportExportButtonsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingImport, setPendingImport] = useState<{ plans: Plan[]; fileName: string } | null>(null);
  const [error, setError] = useState<string>('');

  const handleExportClick = () => {
    onExport();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');

    try {
      const plans = await importPlansFromFile(file);
      setPendingImport({ plans, fileName: file.name });
      setIsModalOpen(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '파일을 가져올 수 없습니다.';
      setError(errorMessage);
      alert(`❌ ${errorMessage}`);
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImportConfirm = (mode: 'merge' | 'replace') => {
    if (pendingImport) {
      onImport(pendingImport.plans, mode);
      setIsModalOpen(false);
      setPendingImport(null);
      
      const message = mode === 'merge' 
        ? `✅ ${pendingImport.plans.length}개의 계획을 추가했습니다.`
        : `✅ ${pendingImport.plans.length}개의 계획으로 교체했습니다.`;
      alert(message);
    }
  };

  const handleImportCancel = () => {
    setIsModalOpen(false);
    setPendingImport(null);
  };

  return (
    <>
      <div className="flex gap-2">
        {/* Export Button */}
        <button
          onClick={handleExportClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium text-sm"
          title="계획을 파일로 내보내기"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="hidden sm:inline">내보내기</span>
        </button>

        {/* Import Button */}
        <button
          onClick={handleImportClick}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium text-sm"
          title="계획을 파일에서 가져오기"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span className="hidden sm:inline">가져오기</span>
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Import Modal */}
      {pendingImport && (
        <ImportModal
          isOpen={isModalOpen}
          fileName={pendingImport.fileName}
          planCount={pendingImport.plans.length}
          onConfirm={handleImportConfirm}
          onCancel={handleImportCancel}
        />
      )}
    </>
  );
}

