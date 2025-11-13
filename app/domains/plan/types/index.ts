export interface Plan {
  id: string;
  title: string;
  description?: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  createdAt: string;
  color?: string; // 색상 이름 (blue, purple, pink 등)
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  plans: Plan[];
}
