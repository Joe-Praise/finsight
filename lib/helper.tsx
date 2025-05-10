export const calculateDuration = (totalMonths: number) => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const result = [];
  if (years > 0) result.push(`${years} year${years > 1 ? 's' : ''}`);
  if (months > 0) result.push(`${months} month${months > 1 ? 's' : ''}`);

  return result.length ? result.join(' ') : '1 month';
};

export function thousandSeperator(value: number | string) {
  const valueCopy = typeof value === 'string' ? Number(value) : value;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(valueCopy);
}
