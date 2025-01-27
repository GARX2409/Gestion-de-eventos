import React, { useState } from 'react';
import api from '../api';
import Swal from 'sweetalert2';

const EventForm = ({ onEventCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/events', { title, description, date, location });
            onEventCreated(res.data);
            Swal.fire({
                icon: 'success',
                title: 'Evento creado!',
                showConfirmButton: false,
                timer: 1500,
            });
            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo crear el evento!',
            });
        }
    };

    return (
        <div className="container">
            <h2>Crear evento</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titulo:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Fecha:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div>
                    <label>Ubicacion:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <button type="submit">Crear evento</button>
            </form>
        </div>
    );
};

export default EventForm;