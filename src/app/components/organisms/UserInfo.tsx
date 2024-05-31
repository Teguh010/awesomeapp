'use client';
import { FiChevronLeft } from 'react-icons/fi';

import useAuthStore from '@/store/useAuthStore';

import Text from '@/app/components/atoms/Text';
import WithAuth from '@/app/components/hoc/WithAuth';
import ButtonLink from '@/app/components/molecules/ButtonLink';
import AboutUser from '@/app/components/organisms/AboutUser';
import Interest from '@/app/components/organisms/Interest';
import UserPicture from '@/app/components/organisms/UserPicture';

export default WithAuth(UserInfo, 'required');
function UserInfo() {
  const user = useAuthStore.useUser();
  return (
    <div className='mx-auto max-w-md'>
      <div className='flex items-center justify-between'>
        <ButtonLink href='#' leftIcon={FiChevronLeft} text='Back' />
        <div className='absolute left-1/2 -translate-x-1/2 transform text-center'>
          <Text as='h1' className='text-center'>{`@${user?.username}`}</Text>
        </div>
      </div>
      <UserPicture />

      <AboutUser />

      <Interest />
    </div>
  );
}
