import { zodiac } from '@/data/zodiac';

function parseDate(dateStr: string) {
  const [day, month, year] = dateStr.split(' ');
  return new Date(`${year}-${month}-${day}`);
}

export function getZodiac(birthdayStr: string) {
  const birthday = parseDate(birthdayStr);

  const find = zodiac.find((item) => {
    const startDate = new Date(item.start_date);
    const endDate = new Date(item.end_date);
    return birthday >= startDate && birthday <= endDate;
  });

  if (!find) {
    return '--';
  }
  return find.name;
}
