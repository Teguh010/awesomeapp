import type { Metadata } from 'next';

import FormInterest from '@/app/components/organisms/FormInterest';

export const metadata: Metadata = {
  title: 'Interest | YouApp Test',
  description: "Let's explore the world",
};

export default function InterestPage() {
  return (
    <>
      <main className='bg-custom-gradient min-h-screen w-full p-4'>
        <FormInterest />
      </main>
    </>
  );
}
