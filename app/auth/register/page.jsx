'use client';

import { registerAction } from '@app/action';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { toast } from 'react-toastify';
import SignInInput from '@components/SignInInput';
import useUser from '@hooks/useUser';

const RegisterForm = () => {
  const [pending, setTransition] = useTransition();
  const { user, status } = useUser();
  const router = useRouter();
  const registerToastId = 'registerToastId';

  useEffect(() => {
    if (status === 'authenticated' && user) {
      toast.warning("You are already logged in!", { autoClose: 2000, toastId: registerToastId });
      router.push('/');
    }
  }, [status, user, router]);

  const handleAction = (formData) => {
    // take the data from the form and send it to the server
    const username = formData.get('username');
    const name = formData.get('name');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { autoClose: 5000, toastId: registerToastId });
      return;
    }
    setTransition(async() => {
      toast.loading("Registering...", { autoClose: false, toastId: registerToastId });
      const { data, error } = await registerAction(username, name, password);
      if (error) {
        toast.update(registerToastId, { render: error, type: toast.TYPE.ERROR, isLoading: false, autoClose: 5000 });
      }
      else {
        signIn('credentials', { username, password, callbackUrl: `/users/${data}` });
        toast.update(registerToastId, { render: `Registered as coder ${username}`, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 2000 });
      }
    })
  }

  return (
    <form action={handleAction} className='bg-white p-8 rounded-lg shadow max-w-sm w-full mx-auto mt-[3%]'>
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      <SignInInput title="Username" name="username" type="text" required />
      <SignInInput title="Name" name="name" type="text" required />
      <SignInInput title="Password" name="password" type="password" />
      <SignInInput title="Confirm Password" name="confirmPassword" type="password" />
      
      <button type="submit" className="signin_btn"  disabled={pending}>
        {pending ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};


export default RegisterForm;