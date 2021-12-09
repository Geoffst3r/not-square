import { csrfFetch } from "./csrf";

const GET_USER_EVENTS = '/events/getUserEvents';
const NO_USER_EVENTS = '/events/noUserEvents';

const getAllUserEvents = (events) => {
    return {
        type: GET_USER_EVENTS,
        events
    }
};

const getNoUserEvents = () => {
    return {
        type: NO_USER_EVENTS
    }
}

export const getUserEvents = (userId) => async (dispatch) => {
    if (userId !== undefined) {
        const res = await csrfFetch(`/api/events/user/${userId}`);
        if (res.ok) {
            const events = await res.json();
            dispatch(getAllUserEvents(events));
            return events;
        };
    } else {
        dispatch(getNoUserEvents());
        return {};
    }
};

const eventUserReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case NO_USER_EVENTS:
            newState = {};
            return newState;
        case GET_USER_EVENTS:
            newState = {};
            action.events.forEach(event => newState[event.id] = event);
            return newState;
        default:
            return state;
    }
};

export default eventUserReducer;
