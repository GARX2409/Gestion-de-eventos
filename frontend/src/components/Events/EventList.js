import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import Swal from 'sweetalert2';
import EventItem from './EventItem';
import EventForm from './EventForm';

const EventList = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const { data } = await API.get('/events');
            setEvents(data);
        } catch (err) {
            Swal.fire('Error', 'No se pudieron cargar los eventos', 'error');
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Eventos</h2>
            <EventForm refreshEvents={fetchEvents} />
            <div className="mt-4">
                {events.map((event) => (
                    <EventItem key={event._id} event={event} refreshEvents={fetchEvents} />
                ))}
            </div>
        </div>
    );
};

export default EventList;

