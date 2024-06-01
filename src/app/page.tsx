
import Text from '@/app/components/atoms/Text';
import FormLogin from '@/app/components/organisms/FormLogin';

export default function LoginPage() {
  return (
    <main className='bg-custom-gradient min-h-screen w-full p-4 default-background'>
      <div className='mx-auto w-full max-w-md'>

        <Text as='h1' variant='title' className='ml-2 mt-16'>
          Login
        </Text>

        <FormLogin />
      </div>
    </main>
  );
}
