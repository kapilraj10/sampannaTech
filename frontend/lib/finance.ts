export function formatMoney(value: number): string {
  const n = Number.isFinite(value) ? value : 0;
  return `Rs. ${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

export function toDateInput(value?: string | null): string {
  return value ? value.slice(0, 10) : '';
}

export function formatDay(value?: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function deadlineLabel(daysLeft: number | null, status: string): { text: string; tone: string } {
  if (status === 'Completed') return { text: 'Completed', tone: 'bg-emerald-50 text-emerald-700' };
  if (status === 'Cancelled') return { text: 'Cancelled', tone: 'bg-slate-100 text-slate-600' };
  if (daysLeft === null) return { text: 'No deadline', tone: 'bg-slate-100 text-slate-600' };
  if (daysLeft < 0) return { text: `${Math.abs(daysLeft)} days overdue`, tone: 'bg-red-50 text-red-700' };
  if (daysLeft === 0) return { text: 'Due today', tone: 'bg-red-50 text-red-700' };
  if (daysLeft <= 7) return { text: `${daysLeft} days left`, tone: 'bg-amber-50 text-amber-700' };
  return { text: `${daysLeft} days left`, tone: 'bg-blue-50 text-blue-700' };
}

export const projectStatuses = ['Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled'];

export const incomeCategories = ['Advance payment', 'Milestone payment', 'Final payment', 'Maintenance', 'Other income'];
export const expenseCategories = [
  'Salary',
  'Freelancer',
  'Hosting / Server',
  'Domain',
  'Software / Tools',
  'Marketing',
  'Travel',
  'Office',
  'Other expense',
];
export const paymentMethods = ['Bank transfer', 'Cash', 'eSewa', 'Khalti', 'Cheque', 'Card', 'Other'];
