'use client';
import { useField, useFormikContext } from 'formik';
import Select, { Props as SelectProps, StylesConfig } from 'react-select';

import { cn } from '@/lib/utils';

import Text from '@/app/components/atoms/Text';

type SelectFieldProps = {
  name: string;
  label: string | null;
  containerClassName?: string;
  options: { label: string; value: string }[];
} & SelectProps;

export default function SelectField({
  label,
  containerClassName,
  options,
  name,
  ...props
}: SelectFieldProps) {
  const { setFieldValue } = useFormikContext(); // Get setFieldValue from Formik context
  const [field, meta] = useField(name); // Get field and meta from useField

  const withLabel = label !== null;

  const handleChange = (selectedOption: any) => {
    setFieldValue(name, selectedOption ? selectedOption.value : ''); // Update the value using Formik's setFieldValue
  };

  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.09)', // bg-white-opacity-9
      borderRadius: '9px', // rounded-[9px]
      border: '0px',
      // padding: '2px', // p-2
      fontSize: '13px', // text-[13px]
      fontWeight: '500', // font-medium
      color: 'white', // text-white
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      marginLeft: '-12px', // Adjust the distance between text and chevron
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white', // Menu background can remain white
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'rgba(0, 0, 0, 0.1)' : 'white', // Highlight selected option
      color: 'black', // Option text color
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white', // Text color for selected value
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6B7280', // placeholder-gray-500
    }),
  };

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
        <Select
          {...props}
          name={name}
          options={options}
          value={
            options
              ? options.find((option) => option.value === field.value)
              : ''
          }
          onChange={handleChange}
          onBlur={() => field.onBlur({ target: { name } })}
          styles={customStyles} // Apply custom styles
        />
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
}
