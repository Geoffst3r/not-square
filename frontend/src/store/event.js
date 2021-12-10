import { csrfFetch } from "./csrf";

const GET_EVENTS = '/events/getAllEvents';
const NEW_EVENT = '/events/new';
const DELETE_EVENT = '/events/delete';

const get = (events) => {
    return {
        type: GET_EVENTS,
        events
    }
};

const newEvent = (event) => {
    return {
        type: NEW_EVENT,
        event
    }
};

const deleteSingleEvent = (id) => {
    return {
        type: DELETE_EVENT,
        id
    }
};

export const getEvents = () => async (dispatch) => {
    const res = await csrfFetch('/api/events');
    if (res.ok) {
        const events = await res.json();
        dispatch(get(events));
        return events;
    };
};

export const makeNewEvent = (event) => async (dispatch) => {
    const { title, body, time, userId } = event;
    const res = await csrfFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({
            title, body, time, userId
        })
    });
    if (res.ok) {
        const event = await res.json();
        dispatch(newEvent(event));
        return event;
    }
};

export const deleteEvent = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${id}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const msg = await res.json();
        if (msg === 'Success') {
            dispatch(deleteSingleEvent(id));
        };
    };
};

const eventReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case DELETE_EVENT:
            newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;
        case GET_EVENTS:
            newState = {};
            action.events.forEach(event => newState[event.id] = event);
            return newState;
        case NEW_EVENT:
            newState = Object.assign({}, state);
            newState[action.event.id] = action.event;
            return newState;
        default:
            return state;
    }
};

export default eventReducer;
