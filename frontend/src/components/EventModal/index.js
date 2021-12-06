import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as eventActions from '../../store/event';
import './Event.css';

function Event({ isLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const eventsObj = useSelector(state => state.event);
    const events = Object.values(eventsObj);

    useEffect(() => {
        dispatch(eventActions.getEvents());
    }, [dispatch])

    return (
        <>
            <button
                className='new-event-button'
                hidden={sessionUser ? false : true}
            > +Event
            </button>
            <ul className='event-list'>
                {isLoaded && events.length > 0 && events.map(event => (
                    <NavLink key={event.id} to={`/events/${event.id}`}>{event.title}</NavLink>
                ))}
            </ul>
        </>
    )
}

export default Event;
