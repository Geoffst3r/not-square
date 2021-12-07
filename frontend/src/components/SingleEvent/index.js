import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as eventActions from '../../store/event';
import './SingleEvent.css';

function SingleEventPage() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const eventObj = useSelector(state => state.event);
    const event = Object.values(eventObj)[0];
    const eventId = event?.id;

    useEffect(() => {
        dispatch(eventActions.getSingleEvent(eventId));
    }, [dispatch])

    return (
        <>
        </>
    )
}

export default SingleEventPage;
