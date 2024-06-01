import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaPowerOff } from 'react-icons/fa6';
// --------------------------------------------------

function Logout() {
  const router = useRouter();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    localStorage.clear();
    toast.success('Logout Successfully!');
    window.location.reload(); 
  };

  return (
    <button
      type='button'
      className='flex w-full items-center justify-center px-4 py-2 text-center text-sm font-normal text-[#FFFFFF] outline-none'
      onClick={handleLogout}
    >
      <FaPowerOff className='mr-2 h-full text-lg font-bold text-[#FFFFFF]' />
      Logout
    </button>
  );
}

export default Logout;
