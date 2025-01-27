import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api, { setAuthToken } from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            setAuthToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            Swal.fire({
                icon: 'success',
                title: 'inicio de sesión exitoso!',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/events'); // Redirige al usuario a la página de eventos
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Credenciales no válidas!',
            });
        }
    };

    return (
        <div className="container">
            <h2>Inicio de sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;