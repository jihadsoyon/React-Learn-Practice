
import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-8xl font-bold text-purple-500">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-gray-500">
                Sorry, the page you are looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="rounded-lg bg-purple-500 px-6 py-3 text-white hover:bg-purple-600"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
