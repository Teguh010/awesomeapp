'use client';
import { useField } from 'formik';
import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

import { cn } from '@/lib/utils';

import Input, { InputProps } from '@/app/components/atoms/Input';
import Text from '@/app/components/atoms/Text';

type PasswordInputFieldProps = {
  name: string;
  label: string | null;
  containerClassName?: string;
} & InputProps;

export default function PasswordInputField({
  label,
  containerClassName = '',
  ...rest
}: PasswordInputFieldProps) {
  const [field] = useField(rest);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const withLabel = label !== null;
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center',
        containerClassName
      )}
    >
      {withLabel && (
        <div className='w-1/3'>
          <Text as='label' variant='label' className='mr-1'>
            {label}
          </Text>
        </div>
      )}
      <div className='relative flex-1'>
        <Input {...field} {...rest} type={showPassword ? 'text' : 'password'} />
        <button
          type='button'
          className='absolute right-0 top-1/3 mr-3'
          onClick={togglePassword}
        >
          {showPassword ? (
            <HiEye className='text-typo-icons hover:text-typo-secondary cursor-pointer text-xl' />
          ) : (
            <HiEyeOff className='text-typo-icons hover:text-typo-secondary cursor-pointer text-xl' />
          )}
        </button>
      </div>
    </div>
  );
}
