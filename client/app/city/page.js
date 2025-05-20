'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CityPage() {
    const searchParams = useSearchParams();
    const countryId = searchParams.get('id');
    const router = useRouter();

    const [cities, setCities] = useState([]);

    const fetchCities = async () => {
        try {
            const res = await fetch(`http://localhost:8080/country/${countryId}/cities`);
            const data = await res.json();
            setCities(data);
        } catch (err) {
            console.error('Failed to fetch cities.');
        }
    };

    useEffect(() => {
        if (!countryId) return;
        fetchCities();
    }, [countryId]);

    const handleCityClick = (id) => {
        router.push(`/gym?id=${id}`);
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Miasta w kraju</h1>
            <ul className="list-disc pl-5 space-y-1">
                {cities.map((city) => (
                <li 
                    key={city._id}
                    onClick={() => handleCityClick(city._id)}
                    className="hover:underline cursor-pointer"
                    >
                    {city.city}
                </li>
                ))}
            </ul>
        </div>
    );
}
