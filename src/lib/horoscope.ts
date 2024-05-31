import { horoscope } from '@/data/horoscope';

function parseDate(dateStr: string) {
  const [day, month, year] = dateStr.split(' ');
  return new Date(`${year}-${month}-${day}`);
}

export function getHoroscope(birthdayStr: string) {
  const birthday = parseDate(birthdayStr);

  const find = horoscope.find((item) => {
    const startDate = new Date(item.start_date);
    startDate.setFullYear(birthday.getFullYear());

    const endDate = new Date(item.end_date);
    endDate.setFullYear(birthday.getFullYear());

    return birthday >= startDate && birthday <= endDate;
  });

  if (!find) {
    return '--';
  }
  return find.name;
}
