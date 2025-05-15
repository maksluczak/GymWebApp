'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleAddCountry = async () => {
    if (!newCountry.trim()) return;

    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/country', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: newCountry }),
      });

      if (!res.ok) throw new Error('Failed to add country');
      setNewCountry('');
      fetchCountries();
    } catch (err) {
      setError('Could not add country');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista krajów</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="list-disc pl-5 mb-6 space-y-1">
        {countries.map((c) => (
          <li key={c._id} className="text-gray-700">{c.country}</li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
          placeholder="Nowy kraj"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <button
          onClick={handleAddCountry}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Dodawanie...' : 'Dodaj kraj'}
        </button>
      </div>
    </main>
  );
}
