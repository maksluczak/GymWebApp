"use client";
import React from "react";
import { useUser } from '../../context/userContext';
import { useEffect, useState } from 'react';

export default function Nav() {
  const { user } = useUser();
  const isLoggedIn = !!user?.email;
  const [userById, setUserById] = useState('');

  const fetchUserById = async () => {
    try {
      const res = await fetch(`http://localhost:8080/user/${user.id}`);
      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
      const data = await res.json();
      const { firstname, lastname } = data;
      setUserById({ firstname, lastname });
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserById();
    }
  }, [user?.id]);

  // console.log(user);
  // console.log(userById);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-[9999]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <div className="text-2xl font-bold text-purple-700">GymWebApp</div>
        {/* {isLoggedIn ? (
          <div>
            <button 
              className="bg-purple-700 text-white px-4 py-2 rounded-full font-medium hover:bg-purple-800">
              {userById.firstname} {userById.lastname}
            </button>
          </div>
        ) : ( */}
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
        {/* )} */}
      </div>
    </nav>
  );
}
