import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';

import {
  getLocalProfileFromLocalStorage,
  calculateAge,
  formatDate,
} from '@/lib/helpers';

import useAuthStore from '@/store/useAuthStore';

import Text from '@/app/components/atoms/Text';
import ButtonLink from '@/app/components/molecules/ButtonLink';
import Card from '@/app/components/molecules/Card';
import FormProfile from '@/app/components/organisms/FormProfile';

export default function AboutUser() {
  const [aboutState, setAboutState] = useState<'about' | 'form'>('about');
  const user = useAuthStore.useUser();
  const localProfile = getLocalProfileFromLocalStorage();

  const age = user?.birthday ? calculateAge(user.birthday) : null;
  const formattedBirthday = user?.birthday ? formatDate(user.birthday) : '';

  return (
    <>
      <Card cardTitle='About' className='mt-5 p-6'>
        {aboutState == 'about' && (
          <>
            <div className='absolute right-5 top-8 h-[18px] w-[18px]'>
              <ButtonLink
                href='#'
                leftIcon={CiEdit}
                className='my-0'
                onClick={() => setAboutState('form')}
              />
            </div>
            {user?.name == undefined ? (
              <Text variant='secondary' className='mt-5'>
                Add in your your to help others know you better
              </Text>
            ) : (
              <>
                <div className='mt-5 flex flex-col gap-2'>
                  <div className=' flex justify-start'>
                    <p className='font-inter mr-3 text-sm font-medium text-[#FFFFFF4D]'>
                      Birthday:{' '}
                    </p>
                    <p className='text-sm font-medium text-[#FFFFFF]'>
                      {formattedBirthday} {age !== null ? `( Age ${age})` : ''}
                    </p>
                  </div>

                  <div className=' flex justify-start'>
                    <p className='font-inter mr-3 text-sm font-medium text-[#FFFFFF4D]'>
                      Horoscope:{' '}
                    </p>
                    <p className='text-sm font-medium text-[#FFFFFF]'>
                      {user?.horoscope ? user?.horoscope : ''}
                    </p>
                  </div>
                  <div className=' flex justify-start'>
                    <p className='font-inter mr-3 text-sm font-medium text-[#FFFFFF4D]'>
                      Zodiac:{' '}
                    </p>
                    <p className='text-sm font-medium text-[#FFFFFF]'>
                      {user?.zodiac ? user?.zodiac : ''}
                    </p>
                  </div>
                  <div className=' flex justify-start'>
                    <p className='font-inter mr-3 text-sm font-medium text-[#FFFFFF4D]'>
                      Height:{' '}
                    </p>
                    <p className='text-sm font-medium text-[#FFFFFF]'>
                      {user?.height ? user?.height : ''}
                      {localProfile != null ? localProfile.height_unit : ''}
                    </p>
                  </div>
                  <div className=' flex justify-start'>
                    <p className='font-inter mr-3 text-sm font-medium text-[#FFFFFF4D]'>
                      Weight:{' '}
                    </p>
                    <p className='text-sm font-medium text-[#FFFFFF]'>
                      {user?.weight ? user?.weight : ''}
                      {localProfile != null ? localProfile.weight_unit : ''}
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
        {aboutState == 'form' && (
          <>
            <FormProfile
              handleBack={() => {
                setAboutState('about');
              }}
            />
          </>
        )}
      </Card>
    </>
  );
}
