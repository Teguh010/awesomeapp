import { FiChevronLeft } from 'react-icons/fi';

import Text from '@/app/components/atoms/Text';
import ButtonLink from '@/app/components/molecules/ButtonLink';
import FormLogin from '@/app/components/organisms/FormLogin';

export default function LoginPage() {
  return (
    <main className='bg-custom-gradient min-h-screen w-full p-4'>
      <div className='mx-auto w-full max-w-md'>
        <ButtonLink href='/' leftIcon={FiChevronLeft} text='Back' />

        <Text as='h1' variant='title' className='ml-2 mt-16'>
          Login
        </Text>

        <FormLogin />
      </div>
    </main>
  );
}
