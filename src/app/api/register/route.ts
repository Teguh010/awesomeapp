import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

import axios from '@/lib/axios';

export async function POST(req: Request) {
  try {
    const res = await axios.post('/register', await req.json());
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
