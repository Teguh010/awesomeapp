import React from 'react';

import { cn } from '@/lib/utils';

const TextVariant = [
  'title',
  'base',
  'secondary',
  'label',
  'gradient-blue',
  'gradient-yellow',
] as const;

type TextProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  variant?: (typeof TextVariant)[number];
} & React.ComponentPropsWithoutRef<T>;

type TextComponent = <T extends React.ElementType = 'p'>(
  props: TextProps<T>
) => React.ReactElement | null;

const Text: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<TextProps<any>> & React.RefAttributes<unknown>
> = React.forwardRef(
  <T extends React.ElementType = 'p'>(
    { as, children, className, variant = 'base', ...rest }: TextProps<T>,
    ref?: React.ComponentPropsWithRef<T>['ref']
  ) => {
    const Component = as || 'p';
    return (
      <Component
        ref={ref}
        {...rest}
        className={cn(
          'text-white',
          variant === 'base' && 'text-[14px] font-[700]',
          variant === 'title' && 'text-[24px] font-[700]',
          variant === 'secondary' &&
            'text-[14px] font-[500] text-opacity-[0.52]',
          variant === 'label' && 'text-[13px] font-[500] text-opacity-[0.33]',
          variant == 'gradient-blue' &&
            'bg-custom-text-gradient-2 bg-clip-text text-[13px] font-[500] text-transparent',
          variant == 'gradient-yellow' &&
            'bg-custom-text-gradient-1 bg-clip-text text-[13px] font-[500] text-transparent',

          className
        )}
      >
        {children}
      </Component>
    );
  }
);

export default Text;
