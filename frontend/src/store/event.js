import { csrfFetch } from "./csrf";

const GET_EVENTS = '/events/getAllEvents';

const get = (events) => {
    return {
        type: GET_EVENTS,
        events
    }
}

export const getEvents = () => async (dispatch) => {
    const res = await csrfFetch('/api/events');
    if (res.ok) {
        const events = await res.json();
        dispatch(get(events));
        return events;
    };
};

const eventReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_EVENTS:
            newState = {};
            action.events.forEach(event => newState[event.id] = event);
            return newState;
        default:
            return state;
    }
};

export default eventReducer;
