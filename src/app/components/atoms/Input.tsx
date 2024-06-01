import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type InputProps = {
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
} & React.ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...rest }, ref) => {
  return (
    <input
      {...rest}
      ref={ref}
      type={type}
      className={cn(
        'bg-white-opacity-9 w-full rounded-[9px] p-2 text-[13px] font-medium outline-none no-underline  placeholder-[#FFFFFF38] border border-[#FFFFFF38]',
        className
      )}
    />
  );
});

Input.displayName = 'Input';

export default Input;
