'use client';

import React from 'react';

import DismissibleToast from '@/app/components/molecules/Toast';

function Providers({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}
      <DismissibleToast />
    </>
  );
}

export default Providers;
