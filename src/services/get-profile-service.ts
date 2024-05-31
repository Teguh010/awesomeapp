'use client';
import { localAxios } from '@/lib/axios';
import { getFromLocalStorage } from '@/lib/helpers';

export const getProfileService = async () => {
  const token = getFromLocalStorage('access_token');
  return await localAxios.get('/api/getProfile', {
    headers: { 'x-access-token': token },
  });
};
