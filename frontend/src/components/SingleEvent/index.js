import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { Modal } from '../../context/Modal';
import EventForm from '../EventModal/EventForm';
import * as singleEventActions from '../../store/singleEvent';
import * as eventActions from '../../store/event';
import * as userEventActions from '../../store/userEvents';
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
    const weekday =
        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = weekday[date.getDay()];
    const months =
        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
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

    const deleteEvent = () => {
        dispatch(eventActions.deleteEvent(id));
        dispatch(eventActions.getEvents());
        dispatch(userEventActions.getUserEvents(sessionUserId));
        history.push('/');
    };

    return (
        <div className='single-event-page'>
            <p className='event-time'>{`${day}, ${month} ${dayOfMonth}, ${hours}:${minutes}${ampm}`}</p>
            <p className='event-title'>{title}</p>
            <div className="created-by-wrapper">
                <i className="fas fa-user-circle fa-lg" />
                <p className='created-by'>{username ? `Posted by ${username}` : null}</p>
            </div>
            <p className="details">Details</p>
            <p className='event-body'>{body}</p>
            <div className="edit-delete">
                <button className="edit-event-single" onClick={() => setShowModal(true)} hidden={sessionUserId === userId ? false : true}>Edit Event</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EventForm event={event} callSetter={callSetter} sessionUser={sessionUser} />
                    </Modal>
                )}
                <button
                    className="delete-event-single"
                    hidden={sessionUserId === userId ? false : true}
                    onClick={() => deleteEvent()}>Delete Event</button>
            </div>
        </div>
    )
}

export default SingleEventPage;
