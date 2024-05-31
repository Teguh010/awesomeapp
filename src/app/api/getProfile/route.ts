import { NextResponse } from 'next/server';

import axios from '@/lib/axios';
import { getHoroscope } from '@/lib/horoscope';
import { getZodiac } from '@/lib/zodiac';

export async function GET(req: Request) {
  const token = await req.headers.get('x-access-token');
  const res = await axios.get('/getProfile', {
    headers: { 'x-access-token': token },
  });

  res.data.data.horoscope = getHoroscope(res.data.data.birthday);
  res.data.data.zodiac = getZodiac(res.data.data.birthday);

  return NextResponse.json(res.data, {
    status: res.status,
    statusText: res.statusText,
  });
}
