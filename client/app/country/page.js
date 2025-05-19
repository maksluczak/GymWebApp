'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
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
      setError('Failed to fetch countries');
    }
  };

  const handleCountryClick = (id) => {
    router.push(`/city?id=${id}`);
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista krajów</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="list-disc pl-5 mb-6 space-y-1">
        {countries.map((c) => (
          <li
            key={c._id}
            onClick={() => handleCountryClick(c._id)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {c.country}
          </li>
        ))}
      </ul>
    </main>
  );
}
