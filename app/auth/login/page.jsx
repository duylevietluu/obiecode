'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition, useEffect } from 'react';
import { toast } from 'react-toastify';
import SignInInput from '@components/SignInInput';
import useUser from '@hooks/useUser';

const LoginForm = ({searchParams}) => {
  const [pending, setTransition] = useTransition();
  const { user, status } = useUser();  

  const router = useRouter();
  const loginToastId = 'loginToastId';
  const callbackUrl = (!searchParams.callbackUrl || searchParams.callbackUrl === '/auth/login') ? '/' : searchParams.callbackUrl;

  useEffect(() => {
    if (status === 'authenticated' && user) {
      toast.warning("You are already logged in!", { autoClose: 2000, toastId: loginToastId });
      router.push(callbackUrl);
    }
  }, [status, user, router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    setTransition(async() => {
      toast("Logging in...", { autoClose: false, toastId: loginToastId });
      const {error} = await signIn('credentials', { username, password, redirect: false });
      if (error) {
        toast.update(loginToastId, { render: error, type: toast.TYPE.ERROR, isLoading: false, autoClose: 5000 });
      }
      else {
        toast.update(loginToastId, { render: `Logged in as coder ${username}`, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 2000 });
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow max-w-sm w-full mx-auto mt-[3%]'>
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <SignInInput title="Username" name="username" type="text" required />
      <SignInInput title="Password" name="password" type="password" />
      <div className='mb-2'>
        <button type="submit" className="signin_btn" disabled={pending}>
          {pending ? 'Logging in...' : 'Login'}
        </button>
      </div>
      <div>
      <Link href='/auth/register'>
        <button type='button' className='signin_btn'>
          Register
        </button>
      </Link>
      </div>
      
    </form>
  );
};

export default LoginForm;