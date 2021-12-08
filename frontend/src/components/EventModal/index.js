import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import EventForm from './EventForm';
import * as eventActions from '../../store/event';
import './Event.css';

function Event() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const eventsObj = useSelector(state => state.events);
    const events = Object.values(eventsObj);
    events.forEach(event => {
        const time = new Date(event.time);
        event.dayString = time.toDateString();
        event.timeString = time.toLocaleTimeString();
    });

    useEffect(() => {
        dispatch(eventActions.getEvents());
    }, [dispatch])

    return (
        <>
            <button onClick={() => setShowModal(true)} hidden={sessionUser ? false : true}>+Event</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EventForm sessionUser={sessionUser} />
                </Modal>
            )}
            <ul className='event-list'>
                {events.length > 0 && events.map(event => (
                    <NavLink style={{ "textDecoration": "none", "color": "black" }}
                        key={event.id} to={`/events/${event.id}`}>
                        <ul className='event'>
                            <li className='event-title'>{event.title}</li>
                            <li className='event-time'>{`${event.dayString} ${event.timeString}`}</li>
                        </ul>
                    </NavLink>
                ))}
            </ul>
        </>
    )
}

export default Event;
