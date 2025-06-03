"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const gymId = searchParams.get('id');
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`http://localhost:8080/gym/${gymId}/products`);
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `HTTP error! ${res.status}`);
            }
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    useEffect(() => {
        if (gymId) {
            fetchProducts();
        }
    }, [gymId]);

    return (
        <main className='min-h-screen p-8 mt-20'>
            <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8'>
                <h1 className='text-4xl font-extrabold text-gray-900 mb-8 text-center border-b-2 pb-4 border-purple-200'>
                    Produkty Dostępne w Siłowni
                </h1>

                {products.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {products.map((product) => (
                            <div 
                                key={product._id} 
                                className='bg-purple-50 p-6 rounded-lg shadow-md border border-purple-100 transform hover:scale-105 transition duration-300 ease-in-out'
                            >
                                <p className='text-xl font-semibold text-purple-800 mb-2'>{product.name}</p>
                                <p className='text-gray-700 text-lg font-bold'>{product.price} PLN</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-gray-600 text-center text-lg py-10'>
                        Brak dostępnych produktów w tej siłowni.
                    </p>
                )}
            </div>
        </main>
    );
}