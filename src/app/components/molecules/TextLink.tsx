import Link from 'next/link';
import React from 'react';

import Text from '@/app/components/atoms/Text';

const TextLinkVariant = ['base', 'gradient-blue', 'gradient-yellow'] as const;
type TextLinkProps = {
  variant?: (typeof TextLinkVariant)[number];
  href: string;
  text: string;
} & React.ComponentPropsWithoutRef<'a'>;
export default function TextLink({
  variant = 'base',
  href,
  text,
  className,
}: TextLinkProps) {
  return (
    <Link href={href}>
      <Text as='span' variant={variant} className={className}>
        {text}
      </Text>
    </Link>
  );
}
