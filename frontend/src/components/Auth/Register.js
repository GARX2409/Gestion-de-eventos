import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import Swal from 'sweetalert2';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', formData);
            Swal.fire('¡Registro exitoso!', 'Ahora puedes iniciar sesión', 'success');
            navigate('/');
        } catch (err) {
            Swal.fire('Error', 'No se pudo registrar el usuario', 'error');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    className="form-control my-2"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="form-control my-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="form-control my-2"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button className="btn btn-primary">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
