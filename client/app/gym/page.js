"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GymPage() {
    const searchParams = useSearchParams();
    const cityId = searchParams.get('id');
    const router = useRouter();

    const [gyms, setGyms] = useState([]);

    const fetchGyms = async () => {
        try {
            const res = await fetch(`http://localhost:8080/city/${cityId}/gyms`);
            const data = await res.json();
            setGyms(data);
        } catch (err) {
            throw new Error('Failed to fetch gyms.');
        }
    };

    useEffect(() => {
        if (!cityId) return;
        fetchGyms();
    }, [cityId]);

    return (
        <section className='flex items-center justify-center'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className="text-2xl font-bold mb-4">Siłownie</h1>
                <ul className='list-disc pl-5 space-y-1'>
                    {gyms.map((gym) => (
                        <li
                            key={gym._id}
                            className="hover:underline cursor-pointer"
                        >
                            {gym.name}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}