import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { Modal } from '../../context/Modal';
import EventForm from '../EventModal/EventForm';
import * as singleEventActions from '../../store/singleEvent';
import * as eventActions from '../../store/event';
import './SingleEvent.css';

function SingleEventPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const event = useSelector(state => state.singleEvent);
    let sessionUserId;
    if (sessionUser) sessionUserId = sessionUser.id;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(singleEventActions.getSingleEvent(id));
    }, [dispatch, id]);

    const { User, body, title, time, userId } = event;
    const username = User?.username;
    const date = new Date(time);
    const day = date.toLocaleDateString();
    let hours;
    let minutes;
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

    if (date.getMinutes() < 10) {
        minutes = `0${date.getMinutes()}`;
    } else {
        minutes = date.getMinutes();
    }

    const callSetter = () => {
        setShowModal(false);
    };

    return (
        <div className='single-event-page'>
            <p className='created-by'>{username ? `Created by: ${username}` : null}</p>
            <p className='event-title'>{title}</p>
            <p className='event-body'>{body}</p>
            <p className='event-time'>{`${day} ${hours}:${minutes} ${ampm}`}</p>
            <button onClick={() => setShowModal(true)} hidden={sessionUserId === userId ? false : true}>Edit Event</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EventForm event={event} callSetter={callSetter} sessionUser={sessionUser} />
                </Modal>
            )}
            <button
                hidden={sessionUserId === userId ? false : true}
                onClick={() => {
                    dispatch(eventActions.deleteEvent(id))
                    history.push('/')
                }}>Delete Event</button>
        </div>
    )
}

export default SingleEventPage;
