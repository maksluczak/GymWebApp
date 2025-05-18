'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters.');
            return;
        }

        console.log({ email, password });

        router.push('/country');
    }

    return (
      <section className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-purple-700 md:text-2xl">
                    Sign in to your account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-purple-700">Your email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                                placeholder="galson@example.com"
                            />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-purple-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                                placeholder="********"
                            />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full text-white bg-purple-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                        <p className="text-sm font-light text-gray-500">
                            Don't have an account yet? <a href="/register" className="font-medium text-purple-700 hover:underline">Sign up</a>
                        </p>
                </form>
            </div>
        </div>
      </section>
    );
  }