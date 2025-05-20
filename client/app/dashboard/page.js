"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../context/userContext';

export default function Dashboard() {
    const { user } = useUser();

    console.log(user);
    
    return (
        <main className='pt-20'>
            <h1 className='text-4xl text-black bold pl-5'>
                Hello from dashboard!
            </h1>
        </main> 
    )
}