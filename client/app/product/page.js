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
            if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            alert(`Error: ${err}`);
        }
    };

    useEffect(() => {
        if (gymId) {
            fetchProducts();
        }
    }, [gymId]);

    return(
        <main className='pt-20'>
            <ul className='list-disc pl-5 space-y-1'>
                {products.map((product) => (
                    <li
                        key={product._id}
                    >
                        {product.name}, {product.price}$
                    </li>
                ))}
            </ul>
        </main>
    )
}