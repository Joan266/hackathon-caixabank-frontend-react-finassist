import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated }) {
    // Check if the user is authenticated
    if (!isAuthenticated) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the child components
    return <Outlet />;
}

export default ProtectedRoute;
