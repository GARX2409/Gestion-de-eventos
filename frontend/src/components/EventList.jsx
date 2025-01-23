import React, { useEffect, useState } from 'react';
import api from '../api';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/events'); // El token se envía automáticamente
                setEvents(res.data);
            } catch (err) {
                console.error('Failed to fetch events', err);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Events</h2>
            <ul>
                {events.map((event) => (
                    <li key={event._id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                        <p>{event.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;