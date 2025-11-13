export function getMonthDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  
  // 월의 첫 날이 속한 주의 일요일부터 시작
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  // 항상 6줄(42일) 고정
  const days: Date[] = [];
  const current = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return days;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDate(dateString: string): Date {
  return new Date(dateString);
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isDateInRange(date: Date, start: string, end: string): boolean {
  const dateTime = date.getTime();
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  return dateTime >= startTime && dateTime <= endTime;
}

export function getMonthName(month: number): string {
  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];
  return months[month];
}

export function getDayName(day: number): string {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[day];
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

