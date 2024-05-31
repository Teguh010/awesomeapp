'use client';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/app/components/atoms/Button';
import Text from '@/app/components/atoms/Text';
import WithAuth from '@/app/components/hoc/WithAuth';
import InputField from '@/app/components/molecules/InputField';
import PasswordInputField from '@/app/components/molecules/PasswordInputField';
import { registerService } from '@/services/register-service';

export default WithAuth(FormRegister, 'without');
function FormRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          confirm_password: '',
        }}
        onSubmit={async (values) => {
          if (values.password != values.confirm_password) {
            toast.error("Confirm password doesn't match");
            return;
          }
          setIsLoading(true);
          const res = await registerService(
            values.email,
            values.username,
            values.password
          );
          if (res.data.isSuccess) {
            router.push('/');
          }
          setIsLoading(false);
        }}
      >
        {({ values }) => (
          <Form>
            <InputField
              containerClassName='mt-5'
              className='h-[51px] w-full p-[18px]'
              name='email'
              placeholder='Create Email'
              label={null}
              type='email'
            />
            <InputField
              containerClassName='mt-5'
              className='h-[51px] w-full p-[18px]'
              name='username'
              placeholder='Create Username'
              label={null}
              type='text'
            />
            <PasswordInputField
              containerClassName='mt-5'
              name='password'
              placeholder='Create Password'
              className='h-[51px] w-full p-[18px]'
              label={null}
            />
            <PasswordInputField
              containerClassName='mt-5'
              name='confirm_password'
              placeholder='Confirm Password'
              className='h-[51px] w-full p-[18px]'
              label={null}
            />
            <Button
              type='submit'
              variant='gradient'
              className='mt-5 h-[51px]'
              disabled={
                values.email == '' ||
                values.username == '' ||
                values.password == '' ||
                values.confirm_password == ''
              }
              isLoading={isLoading}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <div className='mt-8 text-center'>
        <Text as='span' className='text-[13px] font-[500]'>
          Have an account?
        </Text>{' '}
        <Link href='/'>
          <Text
            as='span'
            className='bg-custom-text-gradient-1 bg-clip-text text-[13px] font-[500] text-transparent'
          >
            Login here
          </Text>
        </Link>
      </div>
    </>
  );
}
