'use client';

import { registerAction } from '@app/action';
import { signIn } from 'next-auth/react';
import { useState, useTransition } from 'react';

const RegisterForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pending, setTransition] = useTransition();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('password: ', password);
  // };

  const handleAction = (formData) => {
    // take the data from the form and send it to the server
    const username = formData.get('username');
    const name = formData.get('name');
    const password = formData.get('password');
    setTransition(async() => {
      const { data, error } = await registerAction(username, name, password);
      if (error) {
        alert(error);
      }
      else {
        signIn('credentials', { username, password, callbackUrl: `/users/${data}` });
      }
    })
  }

  return (
    <form action={handleAction} className='bg-white p-8 rounded-lg shadow max-w-sm w-full mx-auto mt-[3%]'>
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      <div className="mb-4">
        <label className="text-gray-700">
          Username
        </label>
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="border border-gray-300 rounded-md p-2 w-full"
          required
          pattern=".{6,}"
          title="Username must be at least 6 characters long."
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700">
          Name
        </label>
        <input
          name="name"
          type="name"
          placeholder="Name"
          required
          className="border border-gray-300 rounded-md p-2 w-full"
          pattern='.{3,}'
          title='Name must be at least 3 characters long.'
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={password}
          onChange={handlePasswordChange}
          required
          pattern=".{8,}"
          title="Password must be at least 8 characters long."
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700">
          Confirm Password
        </label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          pattern={password}
          title="Passwords must match."
        />
      </div>
      <button
        type="submit"
        className="border border-blue-500 bg-blue-500 text-white rounded-md px-4 py-2 w-full font-bold hover:bg-white hover:text-blue-500"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;