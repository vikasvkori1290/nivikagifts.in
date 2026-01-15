import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth, googleProvider } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sync Firebase User with Backend (MongoDB)
    const syncUserWithBackend = async (firebaseUser, additionalData = {}) => {
        try {
            const userData = {
                name: firebaseUser.displayName || additionalData.name || "User",
                email: firebaseUser.email,
                googleId: firebaseUser.uid, // Use Firebase UID as unique ID
            };

            // Allow this endpoint to handle both registration and login via upsert
            const { data } = await axios.post('http://localhost:5000/api/auth/google', userData);

            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            console.error("Backend Sync Error:", error);
            // Fallback: still set the firebase user locally so they aren't blocked, 
            // but they might face issues with features requiring MongoDB ID.
            const fallbackUser = {
                name: firebaseUser.displayName || "User",
                email: firebaseUser.email,
                _id: firebaseUser.uid // Temporary
            };
            setUser(fallbackUser);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // If we have a user, ensure they exist in our DB
                // We check localStorage first to save a network call if already synced
                const storedUser = localStorage.getItem('userInfo');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    await syncUserWithBackend(currentUser);
                }
            } else {
                setUser(null);
                localStorage.removeItem('userInfo');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await syncUserWithBackend(userCredential.user);
        return userCredential.user;
    };

    const register = async (name, email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Firebase Password Auth doesn't have DisplayName by default, update it or send manually
        await syncUserWithBackend(userCredential.user, { name });
        return userCredential.user;
    };

    const googleLogin = async () => {
        const userCredential = await signInWithPopup(auth, googleProvider);
        await syncUserWithBackend(userCredential.user);
        return userCredential.user;
    };

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, googleLogin, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
