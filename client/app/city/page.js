'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MiastaPage() {
  const searchParams = useSearchParams();
  const countryId = searchParams.get('id');

  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!countryId) return;

    const fetchCities = async () => {
      try {
        const res = await fetch(`http://localhost:8080/country/${countryId}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error('Błąd pobierania miast');
      }
    };

    fetchCities();
  }, [countryId]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Miasta w kraju</h1>
      <ul className="list-disc pl-5 space-y-1">
        {cities.map((city) => (
          <li key={city._id}>{city.city}</li>
        ))}
      </ul>
    </div>
  );
}
