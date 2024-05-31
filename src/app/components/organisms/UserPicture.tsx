import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

import { getLocalProfileFromLocalStorage } from '@/lib/helpers';

import useAuthStore from '@/store/useAuthStore';

import Text from '@/app/components/atoms/Text';
import Card from '@/app/components/molecules/Card';

import aquarius from '@/assets/aquarius.png';
import aries from '@/assets/aries.png';
import cancer from '@/assets/cancer.png';
import capricorn from '@/assets/capricorn.png';
import dog from "@/assets/dog.png";
import dragon from "@/assets/dragon.png";
import gemini from '@/assets/gemini.png';
import goat from "@/assets/goat.png";
import horse from "@/assets/horse.png";
import leo from '@/assets/leo.png';
import libra from '@/assets/libra.png';

import monkey from "@/assets/monkey.png";
import ox from "@/assets/ox.png";
import pig from "@/assets/pig.png";
import pisces from '@/assets/pisces.png';
import rabbit from "@/assets/rabbit.png";
import rat from "@/assets/rat.png";
import rooster from "@/assets/rooster.png";
import sagittarius from '@/assets/sagittarius.png';
import scorpius from '@/assets/scorpius.png';
import snake from "@/assets/snake.png";
import taurus from '@/assets/taurus.png';
import tiger from "@/assets/tiger.png";
import virgo from '@/assets/virgo.png';

// ---------------------------------------------

interface HoroscopeImageMap {
  Aquarius: StaticImageData;
  Pisces: StaticImageData;
  Aries: StaticImageData;
  Taurus: StaticImageData;
  Gemini: StaticImageData;
  Cancer: StaticImageData;
  Leo: StaticImageData;
  Virgo: StaticImageData;
  Libra: StaticImageData;
  Scorpius: StaticImageData;
  Sagittarius: StaticImageData;
  Capricorn: StaticImageData;
}


interface ZodiacImageMap {
  Rabbit: StaticImageData;
  Tiger: StaticImageData;
  Ox: StaticImageData;
  Rat: StaticImageData;
  Pig: StaticImageData;
  Dog: StaticImageData;
  Rooster: StaticImageData;
  Monkey: StaticImageData;
  Goat: StaticImageData;
  Horse: StaticImageData;
  Snake: StaticImageData;
  Dragon: StaticImageData;
}

export default function UserPicture() {
  const user = useAuthStore.useUser();
  const [localProfile, setLocalProfile] = useState<{ [k in string]: string }>();

  useEffect(() => {
    const getProfileFromLocalStorage = () => {
      setLocalProfile(getLocalProfileFromLocalStorage());
    };

    getProfileFromLocalStorage();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'profile') {
        getProfileFromLocalStorage();
      }
    };

    const handleLocalStorageUpdate = () => {
      getProfileFromLocalStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdate', handleLocalStorageUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(
        'localStorageUpdate',
        handleLocalStorageUpdate
      );
    };
  }, []);

  const horoscopeImageMap: HoroscopeImageMap = {
    Aquarius: aquarius,
    Pisces: pisces,
    Aries: aries,
    Taurus: taurus,
    Gemini: gemini,
    Cancer: cancer,
    Leo: leo,
    Virgo: virgo,
    Libra: libra,
    Scorpius: scorpius,
    Sagittarius: sagittarius,
    Capricorn: capricorn,
  };

  const horoscopeKey = user?.horoscope as keyof HoroscopeImageMap;
  const horoscopeImage = horoscopeImageMap[horoscopeKey] || null;


   const zodiacImageMap: ZodiacImageMap = {
      Rabbit: rabbit,
      Tiger: tiger,
      Ox: ox,
      Rat: rat,
      Pig: pig,
      Dog: dog,
      Rooster: rooster,
      Monkey: monkey,
      Goat: goat,
      Horse: horse,
      Snake: snake,
      Dragon: dragon,
    };

    const zodiacKey = user?.zodiac as keyof ZodiacImageMap;
    const zodiacImage = zodiacImageMap[zodiacKey] || null;



   // calculaete zodiac icon
  // const ZodiacIcon = () => {
  //   const zodiacImageMap: ZodiacImageMap = {
  //     Rabbit: rabbit,
  //     Tiger: tiger,
  //     Ox: ox,
  //     Rat: rat,
  //     Pig: pig,
  //     Dog: dog,
  //     Rooster: rooster,
  //     Monkey: monkey,
  //     Goat: goat,
  //     Horse: horse,
  //     Snake: snake,
  //     Dragon: dragon,
  //   };

  //   const zodiacKey = user?.zodiac as keyof ZodiacImageMap;
  //   return zodiacImageMap[zodiacKey] || null;
  // };

  return (
    <>
      <Card cardTitle={null} className='mt-5 h-[190px]'>
        {localProfile?.base64profile && (
          <Image
            src={localProfile.base64profile}
            alt='Profile'
            layout='fill'
            objectFit='cover'
            className='rounded-[17px]'
          />
        )}
        <div className='absolute bottom-2 left-5'>
          <Text as='h1'>{`@${user?.username}`}</Text>

          {localProfile?.gender && (
            <Text as='h1'>{`${localProfile.gender}`}</Text>
          )}
            <div className="w-full flex items-center">
            <div className="mr-3 my-2 flex items-center py-2 md:py-2 px-4 rounded-3xl bg-[#1D2F2F]">
             {horoscopeImage && (
                <Image
                  src={horoscopeImage}
                  alt='horoscope'
                  width={30}
                  height={30}
                  className='me-2 flex h-4 w-4 items-center text-base md:h-6 md:w-6'
                   style={{
                    filter: "invert(100%)",
                  }}
                />
              )}
              <p className="me-2 text-[14px] text-[#FFFFFF] font-semibold font-inter">
                {user?.horoscope}
              </p>
            </div>
            <div className="mr-3 my-2 flex items-center py-2 md:py-2 px-4 rounded-3xl bg-[#1D2F2F]">
             {zodiacImage && (
                <Image
                  src={zodiacImage}
                  alt='zodiac'
                  width={30}
                  height={30}
                  className='me-2 flex h-4 w-4 items-center text-base md:h-6 md:w-6'
                   style={{
                    filter: "invert(100%)",
                  }}
                />
              )}
              <p className="me-2 text-[14px] text-[#FFFFFF] font-semibold font-inter">
                {user?.zodiac}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
