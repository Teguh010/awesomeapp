import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

type ButtonLinkProps = {
  href: string;
  text?: string;
  leftIcon?: IconType;
} & React.ComponentPropsWithoutRef<'a'>;
export default function ButtonLink({
  href,
  text,
  leftIcon: LeftIcon,
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <>
      <Link href={href} {...rest}>
        <button
          className={cn(
            'my-4 flex items-center justify-center text-white',
            className
          )}
        >
          {LeftIcon && <LeftIcon />}
          {text}
        </button>
      </Link>
    </>
  );
}
