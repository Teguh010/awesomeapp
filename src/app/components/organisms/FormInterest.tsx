'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { TagsInput } from 'react-tag-input-component';

import { getLocalProfileFromLocalStorage } from '@/lib/helpers';
import useAuthStore from '@/store/useAuthStore';
import Text from '@/app/components/atoms/Text';
import WithAuth from '@/app/components/hoc/WithAuth';
import ButtonLink from '@/app/components/molecules/ButtonLink';
import { getProfileService } from '@/services/get-profile-service';
import { updateProfileService } from '@/services/update-profile-service';

export default WithAuth(FormInterest, 'required');

function FormInterest() {
  const router = useRouter();
  const user = useAuthStore.useUser();
  const login = useAuthStore.useLogin();
  const [interests, setInterests] = useState<string[]>(user?.interests ?? []);
  const localProfile = getLocalProfileFromLocalStorage();
  const inputRef = React.createRef<HTMLInputElement>();

  const handleSave = async () => {
    const res = await updateProfileService(
      user?.name ?? '',
      undefined,
      user?.birthday ?? '',
      user?.horoscope ?? '',
      user?.zodiac ?? '',
      user?.weight ?? '',
      user?.height ?? '',
      interests,
      undefined
    );
    if (res.data.isSuccess) {
      if (user) {
        const profile = await getProfileService();
        login({ ...user, ...profile.data.data });
      }
      router.push('/home');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [interests]);

  return (
    <div className='mx-auto max-w-md'>
      <div className='flex items-center justify-between'>
         <ButtonLink
          href='/home'
          leftIcon={MdArrowBackIosNew}
          text='Back'
          labelSize={14}
          iconSize={22}
        />
        <Text
          as='button'
          className='bg-custom-text-gradient-2 bg-clip-text text-transparent'
          onClick={handleSave}
        >
          Save
        </Text>
      </div>
      <div className='mt-8'>
        <Text className='bg-custom-text-gradient-1 bg-clip-text text-transparent'>
          Tell everyone about yourself
        </Text>
        <Text variant='base' className='text-[20px] pt-[10px]'>
          What interests you?
        </Text>
        <div className='mt-8 text-[12px]'>
          <TagsInput
            value={interests}
            onChange={setInterests}
            name="tags"
            placeHolder={interests.length >= 3 ? 'Type Here' : ''}
          />
          {/* Hidden input to maintain focus */}
          <input
            type="text"
            ref={inputRef}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
