import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as eventActions from '../../store/event';
import './Event.css';

function Event() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const eventsObj = useSelector(state => state.event);
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
            <button
                className='new-event-button'
                hidden={sessionUser ? false : true}
            > +Event
            </button>
            <ul className='event-list'>
                {events.length > 0 && events.map(event => (
                    <NavLink style={{ "textDecoration": "none", "color": "black" }} key={event.id} to={`/events/${event.id}`}>
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
