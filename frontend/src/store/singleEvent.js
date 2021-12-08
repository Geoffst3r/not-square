import { csrfFetch } from "./csrf";

const GET_SINGLE_EVENT = '/events/getSingleEvent';
const EDIT_EVENT = '/events/edit';

const getEvent = (event) => {
    return {
        type: GET_SINGLE_EVENT,
        event
    }
};

const editSingleEvent = (event) => {
    return {
        type: EDIT_EVENT,
        event
    }
}

export const getSingleEvent = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${id}`);
    if (res.ok) {
        const event = await res.json();
        dispatch(getEvent(event));
        return event;
    };
};

export const editEvent = (event) => async (dispatch) => {
    const { title, body, time, id, createdAt, updatedAt, userId } = event;
    const res = await csrfFetch(`/api/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title, body, time, id, createdAt, updatedAt, userId
        })
    });
    if (res.ok) {
        const event = await res.json();
        dispatch(editSingleEvent(event));
        return event;
    }
};

const singleEventReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_SINGLE_EVENT || EDIT_EVENT:
            newState = { ...action.event };
            return newState;
        default:
            return state;
    }
};

export default singleEventReducer;
