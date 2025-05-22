'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUserState] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('user');

        if (stored) {
            setUserState(JSON.parse(stored));
        }
    }, []);

    const setUser = (userData) => {
        setUserState(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    return (
        <userContext.Provider value={{ user, setUser }}>
          {children}
        </userContext.Provider>
      );
}

export const useUser = () => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error('useUser must be used inside UserProvider');
      }
      return context;
};