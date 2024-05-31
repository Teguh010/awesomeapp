import React from 'react';

import { cn } from '@/lib/utils';

type LoaderProps = React.ComponentPropsWithoutRef<'div'>;

export default function Loader({ className }: LoaderProps) {
  return (
    <div
      className={cn(
        'h-4 w-4 animate-spin rounded-full border-4 border-solid border-gray-300 border-t-transparent',
        className
      )}
    ></div>
  );
}
