import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../component/NavBar';
import Footer from '../component/Footer';
import { auth } from '../firebase/firebase.config';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

export const valueConText = createContext();

const RootLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const handleLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

        } catch (error) {

            throw error;
        }
    };

    const handleRegistration = async (email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            toast.success('Registration successful!');
            return result;
        } catch (error) {
            toast.error('Registration failed: ' + error.message);
            throw error;
        }
    };

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully!');
        } catch (error) {
            toast.error('Logout failed: ' + error.message);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const hideLayoutRoutes = ["/error"];
    const hideLayout = hideLayoutRoutes.includes(location.pathname);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <valueConText.Provider
            value={{ handleLogin, handleRegistration, handleLogOut, user, setUser, loading }}
        >
            {!hideLayout && (
                <div className="sticky top-0 z-50">
                    <NavBar />
                </div>
            )}
            <div className={`${!hideLayout ? 'min-h-[calc(100vh-156px)]' : ''}`}>
                <div className="max-w-screen-2xl mx-auto md:mx-12 lg:mx-16 xl:mx-24">
                    <Outlet />
                </div>
            </div>
            {!hideLayout && <Footer />}
            <Toaster position="top-right" reverseOrder={false} />
        </valueConText.Provider>
    );
};

export default RootLayout;
