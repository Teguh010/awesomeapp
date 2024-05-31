'use client';
import { useField } from 'formik';

import { cn } from '@/lib/utils';

import Input, { InputProps } from '@/app/components/atoms/Input';
import Text from '@/app/components/atoms/Text';

type InputFieldProps = {
  name: string;
  label: string | null;
  containerClassName?: string;
} & InputProps;

export default function InputField({
  label,
  containerClassName,
  ...rest
}: InputFieldProps) {
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
        <Input {...field} {...rest} />
      </div>
    </div>
  );
}
