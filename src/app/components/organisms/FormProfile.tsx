import { Form, Formik } from 'formik';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { getLocalProfileFromLocalStorage } from '@/lib/helpers';
import { getHoroscope } from '@/lib/horoscope';
import { getZodiac } from '@/lib/zodiac';
import { cn } from '@/lib/utils';
import { customFormatDate } from '@/lib/helpers';

import useAuthStore from '@/store/useAuthStore';

import Text from '@/app/components/atoms/Text';
import InputField from '@/app/components/molecules/InputField';
import SelectField from '@/app/components/molecules/SelectField';
import { createProfileService } from '@/services/create-profile-service';
import { getProfileService } from '@/services/get-profile-service';
import { updateProfileService } from '@/services/update-profile-service';

type FormProfileProps = {
  handleBack(): void;
};
export default function FormProfile({ handleBack }: FormProfileProps) {
  const login = useAuthStore.useLogin();
  const user = useAuthStore.useUser();
  const localProfile = getLocalProfileFromLocalStorage();

  const [image, setImage] = useState<string | null>(
    localProfile?.base64profile ?? null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          const result = event.target.result;
          if (typeof result === 'string') {
            setImage(result);
          }
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const profileInputRef = useRef<HTMLInputElement>(null);
  const birthdayInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className='mt-8 flex cursor-pointer items-center gap-3 py-3'>
        <div className='relative h-[57px] w-[57px] overflow-hidden rounded-[17px] bg-gray-800'>
          {image ? (
            <Image
              src={image}
              alt='Profile'
              layout='fill'
              objectFit='contain'
              className='rounded-full'
            />
          ) : (
            <div className='flex h-full items-center justify-center '>
              <Text
                as='icon'
                className=' pb-2 text-[50px] font-[200]'
                variant='gradient-yellow'
              >
                +
              </Text>
            </div>
          )}
          <input
            ref={profileInputRef}
            type='file'
            accept='image/*'
            className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
            onChange={handleImageChange}
          />
        </div>
        <button
          className='mt-2 text-sm text-gray-400'
          onClick={() => profileInputRef?.current?.click()}
        >
          Add Image
        </button>
      </div>
      <Formik
        initialValues={{
          name: user?.name ?? '',
          gender: localProfile != null ? localProfile.gender : '',
          birthday: user?.birthday ?? '',
          horoscope: user?.horoscope ?? '',
          zodiac: user?.zodiac ?? '',
          weight:
            user?.weight != undefined
              ? `${user.weight} ${
                  localProfile != null ? localProfile.weight_unit : ''
                }`
              : '',
          height:
            user?.height != undefined
              ? `${user.height} ${
                  localProfile != null ? localProfile.height_unit : ''
                }`
              : '',
        }}
        onSubmit={async (values) => {
          if (
            values.name == '' ||
            values.birthday == '' ||
            values.height == '' ||
            values.weight == ''
          ) {
            toast.error('Please complete your profile');
          }
          if (user?.name == undefined) {
            const res = await createProfileService(
              values.name,
              values.gender,
              values.birthday,
              values.horoscope,
              values.zodiac,
              values.weight,
              values.height,
              user?.interests ?? [],
              image ?? undefined
            );
            if (res.data.isSuccess) {
              handleBack();
              if (user) {
                const profile = await getProfileService();
                login({ ...user, ...profile.data.data });
              }
            }
          } else {
            const res = await updateProfileService(
              values.name,
              values.gender,
              values.birthday,
              values.horoscope,
              values.zodiac,
              values.weight,
              values.height,
              user?.interests ?? [],
              image ?? undefined
            );
            if (res.data.isSuccess) {
              handleBack();
              if (user) {
                const profile = await getProfileService();
                login({ ...user, ...profile.data.data });
              }
            }
          }
        }}
      >
        {({ values, setFieldValue }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            setFieldValue('horoscope', getHoroscope(values.birthday));
            setFieldValue('zodiac', getZodiac(values.birthday));
          }, [setFieldValue, values.birthday]);

          const handleBirthdaySectionClick = () => {
            birthdayInputRef.current?.showPicker();
          };

          return (
            <Form>
              <InputField
                containerClassName='mt-3'
                className='h-[36px] w-full p-[18px] text-right text-white'
                name='name'
                placeholder='Enter name'
                label='Display name:'
                type='text'
              />
              <SelectField
                containerClassName='mt-3'
                name='gender'
                label='Gender:'
                className='h-[36px] w-full text-right'
                placeholder='Select Gender'
                options={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                ]}
              />
              {/* Hide the input field */}
              <div
                className='birthday-section mt-3   flex items-center justify-between'
                onClick={handleBirthdaySectionClick}
              >
                <div className='block  w-1/3'>
                  <Text as='label' variant='label' className='mr-1'>
                    Birthday:
                  </Text>
                </div>

                <div
                  className={cn(
                    'bg-white-opacity-9 h-[36px] w-full flex-1 rounded-[9px] border border-[#FFFFFF38] p-2 px-4 text-right text-[13px] font-medium placeholder-[#FFFFFF38]',
                    {
                      'text-white':
                        values.birthday &&
                        !isNaN(new Date(values.birthday).getTime()),
                      'text-[#FFFFFF38]':
                        !values.birthday ||
                        isNaN(new Date(values.birthday).getTime()),
                    }
                  )}
                >
                  {values.birthday &&
                  !isNaN(new Date(values.birthday).getTime())
                    ? customFormatDate(values.birthday)
                    : 'DD MM YYYY'}
                </div>

                <InputField
                  ref={birthdayInputRef}
                  containerClassName='date-popup'
                  className='h-[36px] w-full p-[18px] text-right text-white'
                  name='birthday'
                  placeholder='DD MM YYYY'
                  label='Birthday:'
                  type='date'
                />
              </div>

              <InputField
                containerClassName='mt-3'
                className='h-[36px] w-full p-[18px] text-right text-[#FFFFFF38]'
                name='horoscope'
                placeholder='--'
                label='Horoscope:'
                type='text'
                disabled={true}
              />
              <InputField
                containerClassName='mt-3'
                className='h-[36px] w-full p-[18px] text-right text-[#FFFFFF38]'
                name='zodiac'
                placeholder='--'
                label='Zodiac:'
                type='text'
                disabled={true}
              />
              <InputField
                containerClassName='mt-3'
                className='h-[36px] w-full p-[18px] text-right text-white'
                name='height'
                placeholder='Add Height'
                label='Height:'
                type='text'
              />
              <InputField
                containerClassName='mt-3'
                className='h-[36px] w-full p-[18px] text-right text-white'
                name='weight'
                placeholder='Add Weight'
                label='Weight:'
                type='text'
              />

              <Text
                as='button'
                type='submit'
                className='absolute right-8 top-6 text-[13px] font-[500] disabled:cursor-not-allowed'
                variant='gradient-yellow'
                disabled={
                  values.name == '' ||
                  values.birthday == '' ||
                  values.height == '' ||
                  values.weight == ''
                }
              >
                Save & Update
              </Text>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
