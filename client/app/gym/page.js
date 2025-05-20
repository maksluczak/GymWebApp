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

    const handleGymClick = (id) => {
        router.push(`/dashboard?id=${id}`);
    };

    return (
        <main className='pt-20'>
            <ul className='list-disc pl-5 space-y-1'>
                {gyms.map((gym) => (
                    <li
                        key={gym._id}
                        onClick={() => handleGymClick(gym._id)}
                        className="hover:underline cursor-pointer"
                    >
                        {gym.name}
                    </li>
                ))}
            </ul>
        </main>
    );
}