import Loader from '@/app/components/atoms/Loader';

export default function PageLoader() {
  return (
    <div className='bg-custom-bg-color fixed inset-0 h-full w-full'>
      <div className='flex h-screen items-center justify-center'>
        <Loader className='h-16 w-16' />
      </div>
    </div>
  );
}
