// services/get-profile-service.ts
'use client';
import api from '@/lib/axios';
import { getFromLocalStorage } from '@/lib/helpers';

export const getProfileService = async () => {
  const token = getFromLocalStorage('access_token');
  try {
    const response = await api.get('/getProfile', {
      headers: { 'x-access-token': token },
    });
    return response;
  } catch (error) {
    console.error('Profile Service Error:', error);
    throw error;
  }
};
