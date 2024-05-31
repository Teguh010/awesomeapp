import { toast } from 'react-hot-toast';

import { localAxios } from '@/lib/axios';
import {
  extractANumberAndAUnit,
  getFromLocalStorage,
  setLocalProfileToLocalStorage,
} from '@/lib/helpers';

export const updateProfileService = async (
  name: string,
  gender: string | undefined,
  birthday: string,
  horoscope: string,
  zodiac: string,
  weight: string,
  height: string,
  interests: string[],
  base64profile: string | undefined
) => {
  const token = getFromLocalStorage('access_token');

  const extractHeight = extractANumberAndAUnit(height);
  const heightValue = extractHeight?.value ? Number(extractHeight.value) : 0;
  const heightUnit = extractHeight?.unit;
  setLocalProfileToLocalStorage('height_unit', heightUnit ?? '');

  const extractWeight = extractANumberAndAUnit(weight);
  const weightValue = extractWeight?.value ? Number(extractWeight.value) : 0;
  const weightUnit = extractWeight?.unit;
  setLocalProfileToLocalStorage('weight_unit', weightUnit ?? '');

  if (gender) {
    setLocalProfileToLocalStorage('gender', gender);
  }
  if (base64profile) {
    setLocalProfileToLocalStorage('base64profile', base64profile);
  }
  return await localAxios
    .put(
      '/api/updateProfile',
      {
        name,
        birthday,
        height: heightValue,
        weight: weightValue,
        interests,
      },
      { headers: { 'x-access-token': token } }
    )
    .then((response) => {
      toast.success('Update Profile Successful');
      response.data.isSuccess = true;
      return response;
    })
    .catch((err) => {
      toast.error(
        Array.isArray(err.response.data.message)
          ? err.response.data.message[0]
          : err.response.data.message
      );
      err.response.data.isSuccess = false;
      return err.response;
    });
};
