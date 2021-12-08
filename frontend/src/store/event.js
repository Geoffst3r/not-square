import { csrfFetch } from "./csrf";

const GET_EVENTS = '/events/getAllEvents';
const NEW_EVENT = '/events/new';

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

const eventReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
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
