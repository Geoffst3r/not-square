import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import * as eventActions from '../../store/event';
import './SingleEvent.css';

function SingleEventPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [event, setEvent] = useState('');

    useEffect(() => {
        dispatch(eventActions.getSingleEvent(id)).then(res => setEvent(res));
    }, [dispatch, id]);

    const { User, body, title, time } = event;
    const username = User?.username;
    const date = new Date(time);
    const day = date.toLocaleDateString();
    let hours;
    let ampm;
    if (date.getHours() < 12) {
        hours = date.getHours();
        ampm = 'AM';
    } else if (date.getHours() === 12) {
        hours = date.getHours();
        ampm = 'PM';
    } else if (date.getHours() === 0) {
        hours = 12;
        ampm = 'AM'
    } else {
        hours = date.getHours() - 12;
        ampm = 'PM';
    }
    const minutes = date.getMinutes();

    return (
        <div className='single-event-page'>
            <p className='created-by'>{username ? `Created by: ${username}` : null}</p>
            <p className='event-title'>{title}</p>
            <p className='event-body'>{body}</p>
            <p className='event-time'>{`${day} ${hours}:${minutes} ${ampm}`}</p>
        </div>
    )
}

export default SingleEventPage;
