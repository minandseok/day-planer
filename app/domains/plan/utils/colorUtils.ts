export interface PlanColor {
  bg: string;      // 배경색
  text: string;    // 텍스트 색
  border: string;  // 테두리 색 (선택적)
  name: string;    // 색상 이름
}

export const PLAN_COLORS: PlanColor[] = [
  {
    name: 'blue',
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
  },
  {
    name: 'purple',
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200',
  },
  {
    name: 'pink',
    bg: 'bg-pink-100',
    text: 'text-pink-800',
    border: 'border-pink-200',
  },
  {
    name: 'rose',
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    border: 'border-rose-200',
  },
  {
    name: 'orange',
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-200',
  },
  {
    name: 'amber',
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-200',
  },
  {
    name: 'emerald',
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
  },
  {
    name: 'teal',
    bg: 'bg-teal-100',
    text: 'text-teal-800',
    border: 'border-teal-200',
  },
  {
    name: 'cyan',
    bg: 'bg-cyan-100',
    text: 'text-cyan-800',
    border: 'border-cyan-200',
  },
  {
    name: 'indigo',
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    border: 'border-indigo-200',
  },
];

export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * PLAN_COLORS.length);
  return PLAN_COLORS[randomIndex].name;
}

export function getColorClasses(colorName: string): PlanColor {
  const color = PLAN_COLORS.find(c => c.name === colorName);
  return color || PLAN_COLORS[0]; // 기본값은 파란색
}

