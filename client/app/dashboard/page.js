"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../context/userContext';

export default function Dashboard() {
    const { user } = useUser();

    const searchParams = useSearchParams();
    const gymId = searchParams.get('id');
    const router = useRouter();

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const res = await fetch(`http://localhost:8080/gym/${gymId}/workouts`);
                const data = await res.json();
                setWorkouts(data);
            } catch (err) {
                alert(`Error: ${err}`);
            }
        }
        if (gymId) {
            fetchWorkouts();
        }
    }, [gymId]);

    console.log(user);
    
    return (
        <main className='pt-20'>
            <h1 className='text-4xl text-black pl-5 pb-5'>
                Hello from dashboard!
            </h1>
            <section className='relative min-h-screen bg-white'>
                <div className='flex absolute top-0 left-0 p-5'>
                    <ul className='list-disc space-y-1'>
                        {workouts.map((workout) => (
                            <li 
                            key={workout._id}
                            >
                            name: {workout.name} <br/>
                            trainer: {workout.trainer?.firstname} {workout.trainer?.lastname} <br/>
                            weekday: {workout.weekday} <br/>
                            hour: {workout.hour} <br/>
                            people: {workout.users?.length} / {workout.max_people} <br/>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='absolute top-0 left-1/2 p-5'>
                    
                </div>
            </section>
        </main>

    )
}