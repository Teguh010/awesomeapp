'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
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
  const handleSave = async () => {
    const res = await updateProfileService(
      user?.name ?? '',
      undefined,
      user?.birthday ?? '',
      user?.horoscope ?? '',
      user?.zodiac ?? '',
      user?.weight && localProfile != null
        ? `${user.weight} ${localProfile.weight_unit}`
        : '',
      user?.height && localProfile != null
        ? `${user.height} ${localProfile.height_unit}`
        : '',
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
  return (
    <div className='mx-auto max-w-md'>
      <div className='flex items-center justify-between'>
        <ButtonLink href='/home' leftIcon={FiChevronLeft} text='Back' />
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
        <Text variant='base' className='text-[20px]'>
          What interest you?
        </Text>
        <div className='mt-8'>
          <TagsInput value={interests} onChange={setInterests} />
        </div>
      </div>
    </div>
  );
}
