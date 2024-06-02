import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { cn } from '@/lib/utils';

type ButtonLinkProps = {
  href: string;
  text?: string;
  leftIcon?: IconType;
  labelSize?: number; 
  iconSize?: number; 
} & React.ComponentPropsWithoutRef<'a'>;

export default function ButtonLink({
  href,
  text,
  leftIcon: LeftIcon,
  labelSize = 13, 
  iconSize = 22, 
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <>
      <Link href={href} {...rest}>
        <button
          className={cn(
            'my-4 flex items-center justify-center text-white font-[600]',
            className
          )}
        >
          {LeftIcon && <LeftIcon className={` pr-1`} style={{ fontSize: `${iconSize}px` }}/>} 
          <span style={{ fontSize: `${labelSize}px` }}>{text}</span> 
        </button>
      </Link>
    </>
  );
}
