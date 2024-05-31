import React from 'react';

import { cn } from '@/lib/utils';

import Text from '@/app/components/atoms/Text';

type CardProps = {
  cardTitle: string | null;
} & React.ComponentPropsWithoutRef<'div'>;
export default function Card({ cardTitle, children, className }: CardProps) {
  const withTitle = cardTitle != null;
  return (
    <>
      <div
        className={cn(
          'bg-custom-bg-card-color relative rounded-[14px] p-5',
          className
        )}
      >
        {withTitle && (
          <Text as='h1' variant='base'>
            {cardTitle}
          </Text>
        )}
        {children}
      </div>
    </>
  );
}
