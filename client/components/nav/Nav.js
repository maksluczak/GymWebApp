// Nav.js
"use client";
import React, { useEffect, useState } from "react";
import { useUser } from '../../context/userContext'; 
import { useRouter } from 'next/navigation'; 

export default function Nav() {
  const { user, setUser } = useUser(); 
  const router = useRouter();
  const isLoggedIn = !!user?.email; 
  const [userProfile, setUserProfile] = useState(null); 

  const fetchUserById = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`http://localhost:8080/user/${user.id}`);
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Failed to fetch user details:', errorData);
        throw new Error(`HTTP error! ${res.status}`);
      }
      const data = await res.json();
      const { firstname, lastname } = data;
      setUserProfile({ firstname, lastname }); 
    } catch (err) {
      console.error(`Error fetching user details: ${err.message}`);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserById();
    } else {
      setUserProfile(null); 
    }
  }, [user?.id]); 

  const handleLogout = () => {
    setUser(null);
    router.push('/'); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-[9999]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <div className="text-2xl font-bold text-purple-700">GymWebApp</div>

        {isLoggedIn ? (
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogout} 
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="h-7 w-7 text-purple-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.0 0112 21a8.966 8.0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {userProfile && ( 
              <span className="text-gray-800 font-semibold text-lg">
                {userProfile.firstname} {userProfile.lastname}
              </span>
            )}
          </div>
        ) : (
          <ul className="md:flex space-x-8">
            <li>
              <a
                href="/"
                className="text-gray-700 font-medium hover:text-purple-700 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="text-gray-700 font-medium hover:text-purple-700 transition"
              >
                Register
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="text-gray-700 font-medium hover:text-purple-700 transition"
              >
                Login
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}