"use client";

import { useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../context/userContext';

export default function Dashboard() {
    const { user } = useUser();

    const searchParams = useSearchParams();
    const gymId = searchParams.get('id');
    const router = useRouter();

    const [workouts, setWorkouts] = useState([]);
    const [userWorkouts, setUserWorkouts] = useState([]);

    console.log(user);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const res = await fetch(`http://localhost:8080/gym/${gymId}/workouts`);
                if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
                const data = await res.json();
                setWorkouts(data);
            } catch (err) {
                alert(`Error: ${err}`);
            }
        };

        const fetchUserWorkouts = async () => {
            try {
                const res = await fetch(`http://localhost:8080/user/${user.id}/workouts`);
                if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
                const data = await res.json();
                setUserWorkouts(data);
            } catch (err) {
                alert(`Error: ${err}`);
            }
        };

        if (gymId && user?.id) {
            fetchWorkouts();
            fetchUserWorkouts();
        }
    }, [gymId, user]);

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
                    <ul className='list-disc space-y-1'>
                        {userWorkouts.map((userWorkout) => (
                            <li
                            key={userWorkout._id}
                            >
                            gym: {userWorkout.gym?.name} <br/>
                            name: {userWorkout.name} <br/>
                            trainer: {userWorkout.trainer?.firstname} {userWorkout.trainer?.lastname} <br/>
                            weekday: {userWorkout.weekday} <br/>
                            hour: {userWorkout.hour} <br/>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>

    )
}