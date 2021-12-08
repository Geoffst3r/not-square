import React, { useState } from "react";
import * as eventActions from "../../store/event";
import * as singleEventActions from "../../store/singleEvent";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import './EventForm.css';

function EventForm({ event, sessionUser }) {
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
        const dateTime = new Date(`${day}T${time}`);
        return dispatch(eventActions.makeNewEvent({ title, body, time: dateTime, userId: id }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        const dateTime = new Date(`${day}T${time}`);
        dispatch(singleEventActions.editEvent({ title, body, time: dateTime, id: event.id, createdAt: event.createdAt, updatedAt: new Date(), userId: id }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        dispatch(singleEventActions.getSingleEvent(event.id));
        return history.push(`/events/${event.id}`);
    };

    return (
        <form onSubmit={event ? handleEdit : handleSubmit} className="event-form">
            <ul className="event-errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
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
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
            </label>
            <div className='set-time'>
                <label className="event-input">
                    Day
                    <input
                        type="date"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        required
                    />
                </label>
                <label className="event-input">
                    Time
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit" className="event-submit">{text}</button>
        </form>
    );
}

export default EventForm;
