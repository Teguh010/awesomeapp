'use client';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useState } from 'react';

import useAuthStore from '@/store/useAuthStore';

import Text from '@/app/components/atoms/Text';
import WithAuth from '@/app/components/hoc/WithAuth';
import ButtonLink from '@/app/components/molecules/ButtonLink';
import AboutUser from '@/app/components/organisms/AboutUser';
import Interest from '@/app/components/organisms/Interest';
import UserPicture from '@/app/components/organisms/UserPicture';
import Logout from '@/app/components/organisms/logout';
import DotsIcon from '@/public/dots.svg';

export default WithAuth(UserInfo, 'required');
function UserInfo() {
  const user = useAuthStore.useUser();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className='mx-auto max-w-md'>
      <div className='flex items-center justify-between'>
        <ButtonLink
          href='#'
          leftIcon={MdArrowBackIosNew}
          text='Back'
          labelSize={14}
          iconSize={22}
        />
        <div className='absolute left-1/2 -translate-x-1/2 transform text-center'>
          <Text as='h1' className='text-center'>{`@${user?.username}`}</Text>
        </div>
        <div className='relative'>
          <button
            type='button'
            className=' m-0 w-1/3 p-0 text-end font-normal text-[#FFFFFF] outline-none md:w-1/2'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <DotsIcon
              width='24'
              className='cursor-pointer text-white'
            />
          </button>
          {showDropdown && (
            <div className='z-99 absolute right-0 mt-0 origin-top-right rounded-lg bg-[#162329] py-1 outline-none'>
              <Logout />
            </div>
          )}
        </div>
      </div>
      <UserPicture />

      <AboutUser />

      <Interest />
    </div>
  );
}
