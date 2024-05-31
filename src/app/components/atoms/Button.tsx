import React from 'react';

import { cn } from '@/lib/utils';

import Loader from '@/app/components/atoms/Loader';

const ButtonVariant = ['base', 'gradient'] as const;
type ButtonProps = {
  variant: (typeof ButtonVariant)[number];
  isLoading?: boolean;
} & React.ComponentPropsWithRef<'button'>;

export default function Button({
  children,
  type,
  variant,
  className,
  isLoading,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={cn(
        'relative w-full rounded-[8px] py-2 text-[16px] font-[700] text-white focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-500',
        variant == 'gradient' &&
          'from-button-gradient-start to-button-gradient-end bg-gradient-to-r',
        className
      )}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className='flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <>
          {children}
          {(disabled || isLoading) && (
            <div className='absolute inset-0 rounded-[8px] bg-gray-500 opacity-50'></div>
          )}
        </>
      )}
    </button>
  );
}
