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
                const errorData = await res.json(); 
                throw new Error(errorData.message || `HTTP error! ${res.status}`);
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
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
                const errorData = await res.json(); 
                throw new Error(errorData.message || `HTTP error! ${res.status}`);
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const handleProductClick = () => {
        router.push(`/product?id=${gymId}`);
    };
    
    return (
        <main className='min-h-screen p-8 mt-20'>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-5xl font-extrabold text-gray-900'>
                    Twoje Centrum Treningowe
                </h1>
                <button
                    onClick={handleProductClick}
                    className='bg-purple-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transition duration-300 ease-in-out shadow-lg'
                >
                    Produkty Siłowni
                </button>
            </div>

            <section className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='bg-white rounded-xl shadow-2xl p-6'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-purple-200'>
                        Dostępne Treningi
                    </h2>
                    <div className='space-y-6'>
                        {workouts.length > 0 ? (
                            workouts.map((workout) => (
                                <div 
                                    key={workout._id} 
                                    className='bg-purple-50 p-5 rounded-lg shadow-md border border-purple-100 flex justify-between items-center'
                                >
                                    <div>
                                        <p className='text-xl font-semibold text-purple-800'>{workout.name}</p>
                                        <p className='text-gray-600'>Trener: {workout.trainer?.firstname} {workout.trainer?.lastname}</p>
                                        <p className='text-gray-600'>Dzień: {workout.weekday} | Godzina: {workout.hour}</p>
                                        <p className='text-gray-600'>Uczestnicy: {workout.users?.length} / {workout.max_people}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleSignUpForWorkout(workout._id)}
                                        className='bg-purple-600 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
                                        disabled={workout.users?.length >= workout.max_people}
                                    >
                                        Zapisz się
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className='text-gray-600 text-center py-10'>Brak dostępnych treningów.</p>
                        )}
                    </div>
                </div>
                <div className='bg-white rounded-xl shadow-2xl p-6'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-purple-200'>
                        Moje Treningi
                    </h2>
                    <div className='space-y-6'>
                        {userWorkouts.length > 0 ? (
                            userWorkouts.map((userWorkout) => (
                                <div 
                                    key={userWorkout._id} 
                                    className='bg-blue-50 p-5 rounded-lg shadow-md border border-blue-100 flex justify-between items-center'
                                >
                                    <div>
                                        <p className='text-xl font-semibold text-blue-800'>{userWorkout.name}</p>
                                        <p className='text-gray-600'>Siłownia: {userWorkout.gym?.name}</p>
                                        <p className='text-gray-600'>Trener: {userWorkout.trainer?.firstname} {userWorkout.trainer?.lastname}</p>
                                        <p className='text-gray-600'>Dzień: {userWorkout.weekday} | Godzina: {userWorkout.hour}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleSignOutFromWorkout(userWorkout._id)}
                                        className='bg-red-500 text-white px-5 py-2 rounded-full font-medium hover:bg-red-600 transition duration-300 ease-in-out'
                                    >
                                        Wypisz się
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className='text-gray-600 text-center py-10'>Nie jesteś zapisany na żadne treningi.</p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}