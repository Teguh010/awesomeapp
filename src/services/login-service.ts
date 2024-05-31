import { toast } from 'react-hot-toast';

import { localAxios } from '@/lib/axios';
import { removeFromLocalStorage, setToLocalStorage } from '@/lib/helpers';
import { isEmail } from '@/lib/regex';

export const loginService = async (
  email_or_username: string,
  password: string
) => {
  return await localAxios
    .post('/api/login', {
      email: isEmail(email_or_username) ? email_or_username : '',
      username: isEmail(email_or_username) ? '' : email_or_username,
      password: password,
    })
    .then((response) => {
      if (response.data.access_token) {
        toast.success('Login successful');
        setToLocalStorage('access_token', response.data.access_token);
        removeFromLocalStorage('profile');
        response.data.isSuccess = true;
      } else {
        toast.error(response.data.message);
        response.data.isSuccess = false;
      }
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
