"use client";
import React from "react";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-[9999]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <div className="text-2xl font-bold text-purple-700">GymWebApp</div>
        
        <ul className="md:flex space-x-8">
          <li>
            <a
              href="#"
              className="text-purple-700 font-medium hover:text-purple-900 transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/register"
              className="text-gray-700 hover:text-purple-700 transition"
            >
              Register
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="text-gray-700 hover:text-purple-700 transition"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
