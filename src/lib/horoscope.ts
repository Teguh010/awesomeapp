import { horoscope } from '../data/horoscope';

export function getHoroscope(dateString: string): string | null {
  const inputDate = new Date(dateString);
  const year = inputDate.getFullYear();
  
  const adjustedHoroscopes = horoscope.map(h => ({
    ...h,
    start_date: new Date(`${year}-${h.start_date.slice(5)}`),
    end_date: new Date(`${year}-${h.end_date.slice(5)}`),
  }));

  // Find Capricorn and handle the year transition
  const capricorn = adjustedHoroscopes.find(h => h.name === 'Capricorn');
  if (capricorn) {
    capricorn.end_date = new Date(`${year + 1}-01-19`);
  }

  for (const sign of adjustedHoroscopes) {
    if (inputDate >= sign.start_date && inputDate <= sign.end_date) {
      return sign.name;
    }
  }

  return null;
}
