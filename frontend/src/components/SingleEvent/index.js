import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import * as eventActions from '../../store/event';
import EventForm from '../EventModal/EventForm';
import './SingleEvent.css';

function SingleEventPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    let sessionUserId;
    if (sessionUser) sessionUserId = sessionUser.id;
    const [event, setEvent] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(eventActions.getSingleEvent(id)).then(res => setEvent(res));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(eventActions.editEvent(event)).then(res => setEvent(res));
    }, [dispatch, event]);

    const { User, body, title, time, userId } = event;
    const username = User?.username;
    const date = new Date(time);
    const day = date.toLocaleDateString();
    let hours;
    let ampm;
    if (date.getHours() === 12) {
        hours = date.getHours();
        ampm = 'PM';
    } else if (date.getHours() === 0) {
        hours = 12;
        ampm = 'AM'
    } else if (date.getHours() < 12) {
        hours = date.getHours();
        ampm = 'AM';
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
            <button onClick={() => setShowModal(true)} hidden={sessionUserId === userId ? false : true}>Edit Event</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EventForm event={event} sessionUser={sessionUser} />
                </Modal>
            )}
        </div>
    )
}

export default SingleEventPage;
