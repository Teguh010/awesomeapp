import { toast } from 'react-hot-toast';

import { localAxios } from '@/lib/axios';
import {
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

  const heightValue = Number(height)
  setLocalProfileToLocalStorage('height_unit', height ?? '');

  const weightValue = Number(weight)
  setLocalProfileToLocalStorage('weight_unit', weight ?? '');

  if (gender) {
    setLocalProfileToLocalStorage('gender', gender);
  }
  if (base64profile) {
    setLocalProfileToLocalStorage('base64profile', base64profile);
  }
  return await localAxios
    .put(
      '/updateProfile',
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
