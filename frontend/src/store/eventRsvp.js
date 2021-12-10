import { csrfFetch } from "./csrf";

const GET_RSVPS = '/rsvp/getAllRSVPs';
const NEW_RSVP = '/rsvp/new';
const DELETE_RSVP = '/rsvp/delete';

const get = (rsvps) => {
    return {
        type: GET_RSVPS,
        rsvps
    }
};

const newRSVP = (rsvp) => {
    return {
        type: NEW_RSVP,
        rsvp
    }
};

const deleteSingleRSVP = () => {
    return {
        type: DELETE_RSVP
    }
};

export const getRSVPs = (eventId) => async (dispatch) => {
    const res = await csrfFetch(`/api/rsvp/${eventId}`);
    if (res.ok) {
        const rsvps = await res.json();
        dispatch(get(rsvps));
        return rsvps;
    };
};

export const makeNewRSVP = (rsvpInput) => async (dispatch) => {
    const { eventId, userId } = rsvpInput;
    const res = await csrfFetch('/api/rsvp', {
        method: 'POST',
        body: JSON.stringify({
            eventId, userId
        })
    });
    if (res.ok) {
        const rsvp = await res.json();
        dispatch(newRSVP(rsvp));
        return rsvp;
    }
};

export const deleteRSVP = (rsvpInput) => async (dispatch) => {
    const { eventId, userId } = rsvpInput;
    const res = await csrfFetch('/api/rsvp', {
        method: 'DELETE',
        body: JSON.stringify({
            eventId, userId
        })
    });
    if (res.ok) {
        const msg = await res.json();
        if (msg === 'Success') {
            dispatch(deleteSingleRSVP());
        };
    };
};

const rsvpReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_RSVPS:
            newState = {};
            action.rsvps.forEach(rsvp => newState[rsvp.userId] = rsvp);
            return newState;
        case NEW_RSVP:
            newState = Object.assign({}, state);
            newState[action.rsvp.userId] = action.rsvp;
            return newState;
        default:
            return state;
    }
};

export default rsvpReducer;
