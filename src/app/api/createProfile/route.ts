import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

import axios from '@/lib/axios';

export async function POST(req: Request) {
  const token = await req.headers.get('x-access-token');
  const body = await req.json();
  try {
    const res = await axios.post('/createProfile', body, {
      headers: { 'x-access-token': token },
    });
    return NextResponse.json(res.data, {
      status: res.status,
      statusText: res.statusText,
    });
  } catch (error) {
    return NextResponse.json((error as AxiosError).response?.data, {
      status: 500,
    });
  }
}
