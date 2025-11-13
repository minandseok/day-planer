import type { Plan } from '../types';

export interface ExportData {
  version: string;
  exportDate: string;
  plans: Plan[];
}

export function exportPlansToFile(plans: Plan[]): void {
  const exportData: ExportData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    plans,
  };

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const date = new Date();
  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const fileName = `day-planner-backup-${dateString}.json`;

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function importPlansFromFile(file: File): Promise<Plan[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const data = JSON.parse(text) as ExportData;

        // 데이터 유효성 검증
        if (!validatePlansData(data)) {
          throw new Error('잘못된 파일 형식입니다.');
        }

        resolve(data.plans);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('파일을 읽을 수 없습니다.'));
    };

    reader.readAsText(file);
  });
}

export function validatePlansData(data: unknown): data is ExportData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const exportData = data as Partial<ExportData>;

  if (!exportData.version || !exportData.exportDate || !Array.isArray(exportData.plans)) {
    return false;
  }

  // 각 계획의 필수 필드 확인
  return exportData.plans.every(plan => {
    return (
      typeof plan === 'object' &&
      plan !== null &&
      typeof plan.id === 'string' &&
      typeof plan.title === 'string' &&
      typeof plan.startDate === 'string' &&
      typeof plan.endDate === 'string' &&
      typeof plan.createdAt === 'string'
    );
  });
}

