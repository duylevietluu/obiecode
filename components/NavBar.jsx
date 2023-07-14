'use client';

import Link from "next/link";
import { Montserrat } from 'next/font/google';
import { useSession, signIn, signOut } from "next-auth/react";
import { extractUserInfo } from "@utils/utilFunc";

const navfont = Montserrat({ subsets: ['latin'], weight: '400' });

const NavBar = () => {
  const { data, status } = useSession();
  const user = extractUserInfo(data);
  return (
    <nav className={'flex justify-between items-center w-[92%] p-4 mx-auto ' + navfont.className}>
      {/* logo on the left */}
      <Link href="/">
        <img 
          src='/logo.svg'
          alt='logo'
          className='object-contain'
          width={200}
        />
      </Link>

      {/* in the middle */}
      <div className='flex items-center gap-[4vw]'>
        <Link href='/tests' className='nav_link'>Problems</Link>
        {user && <Link href={`/users/${user._id}`} className='nav_link'>Profile</Link>}
        <Link href='/users' className='nav_link'>Users</Link>
      </div>

      {/* button to sign in and out, this SHOULD be client side components*/}
      <SignButton user={user} status={status} />
    </nav>
  )
}

const SignButton = ({user, status}) => {
  if (status === "loading") {
    return (
      <button className='text-2xl text-blue-700 font-bold' disabled>
        Loading...
      </button>
    )
  }
  return (
    user ?
    <button className="text-2xl text-red-500 hover:text-red-700 font-bold" 
      onClick={() => {if (confirm("Do you want to sign out?")) signOut()}}>
      Sign Out
    </button>
    :
    <button className='text-2xl text-green-500 hover:text-green-600 font-bold' onClick={signIn}>
      Sign In
    </button>
  )
}

export default NavBar