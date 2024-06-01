'use client';
import { forwardRef } from 'react';
import { useField } from 'formik';

import { cn } from '@/lib/utils';

import Input, { InputProps } from '@/app/components/atoms/Input';
import Text from '@/app/components/atoms/Text';

type InputFieldProps = {
  name: string;
  label: string | null;
  containerClassName?: string;
} & InputProps;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, containerClassName, ...rest }, ref) => {
    const [field] = useField(rest);

    const withLabel = label !== null;
    return (
      <div className={cn('flex items-center justify-center', containerClassName)}>
        {withLabel && (
          <div className='w-1/3'>
            <Text as='label' variant='label' className='mr-1'>
              {label}
            </Text>
          </div>
        )}
        <div className='flex-1'>
          <Input {...field} {...rest} ref={ref} />
        </div>
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
