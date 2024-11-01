"use client"; // Mark this file as a client component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import {User} from "@/models/response/LoginResponse";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreator, setIsCreator] = useState(false)
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedUser = localStorage.getItem('user');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    if (storedUser) {
      console.log(JSON.parse(storedUser))
      const user: User = JSON.parse(storedUser);
      console.log("user: ", JSON.stringify(user))
      setIsCreator(user.is_creator);
      console.log("user.is_creator: ", user.is_creator)
      console.log("isCreator: ", isCreator)
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    router.push('/login');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleUploadClick = () => {
    router.push('/upload');
  };

  const handleWorksClick = () => {
    router.push('/works');
  };

  const handleBeCeatorClick = () => {
    router.push('/be_creator');
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {isLoggedIn ? (
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <p>Welcome, {username}!</p>
            <button
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              onClick={handleLogout}
            >
              Logout
            </button>
            {isCreator ? (
                <>
                  <button
                      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                      onClick={handleUploadClick}
                  >
                    Go to Upload
                  </button>
                  <button
                      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                      onClick={handleWorksClick}
                  >
                    My Works
                  </button>
                </>
            ) : (
                <button
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                    onClick={handleBeCeatorClick}
                >
                  Become a Creator
                </button>
            )}
          </div>
        ) : (
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <button
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              onClick={handleLoginClick}
            >
              Go to Login
            </button>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
