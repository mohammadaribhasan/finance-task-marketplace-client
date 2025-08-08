import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-3xl text-center">
                <h1 className="text-5xl font-bold text-gray-800">404</h1>
                <p className="mt-4 text-xl text-gray-600">
                    Oops! The page you are looking for doesn’t exist.
                </p>
                <p className="text-gray-500">It might have been moved or deleted.</p>
                <Link
                    to="/"
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 transition duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default Error;
