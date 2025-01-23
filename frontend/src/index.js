import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { setAuthToken } from './api';

// Verifica si hay un token en localStorage y configúralo en Axios
const token = localStorage.getItem('token');
if (token) {
    setAuthToken(token);
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);