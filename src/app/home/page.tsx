import type { Metadata } from 'next';

import UserInfo from '@/app/components/organisms/UserInfo';

export const metadata: Metadata = {
  title: 'Home | YouApp Test',
  description: "Let's explore the world",
};
export default function HomePage() {
  return (
    <main className='bg-custom-bg-color min-h-screen w-full p-4'>
      <UserInfo />
    </main>
  );
}
