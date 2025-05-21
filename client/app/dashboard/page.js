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
    const [userWorkouts, setUserWorkouts] = useState([]);

    console.log(user);

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

    useEffect(() => {
        if (gymId && user?.id) {
            fetchWorkouts();
            fetchUserWorkouts();
        }
    }, [gymId, user]);

    const handleSignUpForWorkout = async (workoutId) => {
        try {
            const res = await fetch(`http://localhost:8080/workout/${workoutId}/signup`, {
                method: 'POST',
                body: JSON.stringify({ email: user.email }),
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (res.ok) {
                console.log('User successfully signed up for workout');
                await fetchUserWorkouts();
                await fetchWorkouts();
            } else {
                if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
            }
        } catch (err) {
            alert(`Error: ${err}`);
        }
    };

    const handleSignOutFromWorkout = async (workoutId) => {
        try {
            const res = await fetch(`http://localhost:8080/user/${user.id}/workout/${workoutId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                console.log('User successfully signed out from workout');
                await fetchUserWorkouts();
                await fetchWorkouts();
            } else {
                if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
            }
        } catch (err) {
            alert(`Error: ${err}`);
        }
    };
    
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
                            <button 
                            onClick={() => handleSignUpForWorkout(workout._id) }
                            className='text-white bg-purple-600 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                                SignUp
                            </button>
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
                            <button 
                            onClick={() => handleSignOutFromWorkout(userWorkout._id) }
                            className='text-white bg-purple-600 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                                SignOut
                            </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    )
}