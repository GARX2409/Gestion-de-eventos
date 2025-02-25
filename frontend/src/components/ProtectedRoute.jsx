import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage

    // Si no hay token, redirige al usuario a la página de login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si hay token, permite el acceso a la ruta protegida
    return children;
};

export default ProtectedRoute;