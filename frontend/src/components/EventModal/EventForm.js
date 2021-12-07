import React, { useState } from "react";
// import * as eventActions from "../../store/event";
// import { useDispatch } from "react-redux";
import './EventForm.css';

function EventForm({ sessionUser }) {
    // const { id } = sessionUser;
    // const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    // const [errors, setErrors] = useState([]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const dateTime = new Date(`${day}T${time}`);
    //     return dispatch(eventActions.addEvent({ title, body, time: dateTime, userId: id }))
    //         .catch(async (res) => {
    //             const data = await res.json();
    //             if (data && data.errors) setErrors(data.errors);
    //         });
    // };
    // onSubmit={handleSubmit}

    return (
        <form className="event-form">
            {/* <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul> */}
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
            <button type="submit" className="new-event-submit">Post Event</button>
        </form>
    );
}

export default EventForm;
