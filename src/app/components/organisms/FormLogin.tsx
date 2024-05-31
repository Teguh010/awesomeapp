'use client';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';

import useAuthStore from '@/store/useAuthStore';

import Button from '@/app/components/atoms/Button';
import Text from '@/app/components/atoms/Text';
import WithAuth from '@/app/components/hoc/WithAuth';
import InputField from '@/app/components/molecules/InputField';
import PasswordInputField from '@/app/components/molecules/PasswordInputField';
import { getProfileService } from '@/services/get-profile-service';
import { loginService } from '@/services/login-service';

export default WithAuth(FormLogin, 'without');
function FormLogin() {
  const login = useAuthStore.useLogin();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <Formik
        initialValues={{
          email_or_username: '',
          password: '',
        }}
        onSubmit={async (values) => {
          setIsLoading(true);
          const res = await loginService(
            values.email_or_username,
            values.password
          );
          if (res.data.isSuccess) {
            const profile = await getProfileService();
            if (profile.data.data.email) {
              login({ ...profile.data.data });
            }
          }
          setIsLoading(false);
        }}
      >
        {({ values }) => (
          <Form>
            <InputField
              containerClassName='mt-5'
              className='h-[51px] w-full p-[18px]'
              name='email_or_username'
              placeholder='Enter Username/Email'
              label={null}
            />
            <PasswordInputField
              containerClassName='mt-5'
              name='password'
              placeholder='Enter Password'
              className='h-[51px] w-full p-[18px]'
              label={null}
            />
            <Button
              type='submit'
              variant='gradient'
              className='mt-5 h-[51px]'
              disabled={values.email_or_username == '' || values.password == ''}
              isLoading={isLoading}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <div className='mt-8 text-center'>
        <Text as='span' className='text-[13px] font-[500]'>
          No account?
        </Text>{' '}
        <Link href='/register'>
          <Text
            as='span'
            className='bg-custom-text-gradient-1 bg-clip-text text-[13px] font-[500] text-transparent'
          >
            Register here
          </Text>
        </Link>
      </div>
    </>
  );
}
