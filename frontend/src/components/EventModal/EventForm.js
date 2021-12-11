import React, { useState } from "react";
import * as eventActions from "../../store/event";
import * as singleEventActions from "../../store/singleEvent";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import './EventForm.css';

function EventForm({ event, callSetter, sessionUser }) {
    const { id } = sessionUser;
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(event ? event.title : "");
    const [body, setBody] = useState(event ? event.body : "");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [errors, setErrors] = useState([]);

    const text = event ? 'Edit Event' : 'Post Event';

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const dateTime = new Date(`${day}T${time}`);
        dispatch(eventActions.makeNewEvent({ title, body, time: dateTime, userId: id }))
            .then(event => history.push(`/events/${event.id}`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) return setErrors(data.errors);
            });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setErrors([]);
        const dateTime = new Date(`${day}T${time}`);
        dispatch(singleEventActions.editEvent({ title, body, time: dateTime, id: event.id, createdAt: event.createdAt, updatedAt: new Date(), userId: id }))
            .then(event => {
                dispatch(singleEventActions.getSingleEvent(event.id));
                callSetter();
                return history.push(`/events/${event.id}`);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) return setErrors(data.errors);
            });
    };

    return (
        <form onSubmit={event ? handleEdit : handleSubmit} className="event-form">
            <label className="event-input">
                Title
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label className="event-input">
                Body
                <textarea
                    style={{ "resize": "none" }}
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
            </label>
            <div className='set-time'>
                <label className="event-input set-day">
                    Day
                    <input
                        type="date"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        required
                    />
                </label>
                <label className="event-input set-timing">
                    Time
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </label>
            </div>
            <ul className="event-errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <button type="submit" className="event-submit">{text}</button>
        </form>
    );
}

export default EventForm;
