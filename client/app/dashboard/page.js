"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    return (
        <main className='pt-20'>
            <h1 className='text-4xl text-black bold pl-5'>
                Hello from dashboard!
            </h1>
        </main> 
    )
}