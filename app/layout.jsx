import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@components/NavBar'
import AuthProvider from '@components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ObieCode',
  description: 'ObieCode is a beginner-friendly online platform tailored for Oberlin College students, focusing on Python programming. Discover a world of coding challenges and puzzles designed to help you learn Python and improve your problem-solving skills. Join our supportive community, sharpen your coding abilities, and prepare for future coding endeavors. Start your Python coding journey with ObieCode and unlock your potential today!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <header className='bg-[#ececf1] text-gray-800'>
            <NavBar />
          </header>
          <main className={"min-h-screen flex-col justify-between px-24 py-10  text-gray-800 bg-transparent"}>
            {children}
          </main>
        </body>
      </AuthProvider>
      
    </html>
  )
}
