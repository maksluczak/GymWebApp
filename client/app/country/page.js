'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CountryPage() {
    const [countries, setCountries] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const res = await fetch('http://localhost:8080/country'); 
            const data = await res.json();
            setCountries(data);
        } catch (err) {
            throw new Error('Failed to fetch countries');
        }
    };

    const handleCountryClick = (id) => {
        router.push(`/city?id=${id}`);
    };

    return (
        <main className="pt-20">
            <ul className="list-disc pl-5 space-y-1">
                {countries.map((c) => (
                <li
                key={c._id}
                onClick={() => handleCountryClick(c._id)}
                className="hover:underline cursor-pointer"
                >
                {c.country}
                </li>
                ))}
            </ul>
        </main>
    );
}
