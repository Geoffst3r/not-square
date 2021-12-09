import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import EventForm from './EventForm';
import * as eventActions from '../../store/event';
import * as userActions from '../../store/userEvents';
import './Event.css';

function Event() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser?.id;

    const eventsObj = useSelector(state => state.events);
    const events = Object.values(eventsObj);
    events.forEach(event => {
        const time = new Date(event.time);
        event.dayString = time.toDateString();
        event.timeString = time.toLocaleTimeString();
    });

    const userEventsObj = useSelector(state => state.userEvents);
    const userEvents = Object.values(userEventsObj);
    userEvents.forEach(event => {
        const time = new Date(event.time);
        event.dayString = time.toDateString();
        event.timeString = time.toLocaleTimeString();
    });

    useEffect(() => {
        dispatch(eventActions.getEvents());
    }, [dispatch]);

    useEffect(() => {
        dispatch(userActions.getUserEvents(userId));
    }, [dispatch, userId]);

    return (
        <>
            <button className="add-event" onClick={() => setShowModal(true)} hidden={sessionUser ? false : true}>+Event</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EventForm sessionUser={sessionUser} />
                </Modal>
            )}
            <p className='your-event-list'>Your Events</p>
            <ul className='event-list'>
                {sessionUser ? (userEvents.length > 0 ? userEvents.map(event => (
                    <NavLink style={{ "textDecoration": "none", "color": "black" }}
                        key={event.id} to={`/events/${event.id}`}>
                        <ul className='event'>
                            <li className='event-title'>{event.title}</li>
                            <li className='event-time'>{`${event.dayString} ${event.timeString}`}</li>
                        </ul>
                    </NavLink>
                )) : <li className='empty-events'>You do not have any events</li>) : <li className='empty-events'>Log in to view your events</li>}
            </ul>
            <p className='all-event-list'>All Events</p>
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
