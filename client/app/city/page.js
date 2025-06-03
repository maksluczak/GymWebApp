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
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `HTTP error! ${res.status}`);
            }
            const data = await res.json();
            setCities(data);
        } catch (err) {
            alert(`Error fetching cities: ${err.message}`);
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
        <main className='min-h-screen  p-8 mt-20'>
            <div className='max-w-xl mx-auto bg-white rounded-xl shadow-2xl p-8'>
                <h1 className='text-4xl font-extrabold text-gray-900 mb-8 text-center border-b-2 pb-4 border-purple-200'>
                    Wybierz Miasto
                </h1>

                {cities.length > 0 ? (
                    <div className='grid grid-cols-1 gap-6'>
                        {cities.map((city) => (
                            <div
                                key={city._id}
                                onClick={() => handleCityClick(city._id)}
                                className="bg-purple-50 p-6 rounded-lg shadow-md border border-purple-100 cursor-pointer transform hover:scale-105 hover:bg-purple-100 transition duration-300 ease-in-out flex items-center justify-between"
                            >
                                <p className='text-xl font-semibold text-purple-800'>{city.city}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-gray-600 text-center text-lg py-10'>
                        Brak dostępnych miast w tym kraju.
                    </p>
                )}
            </div>
        </main>
    );
}