import { csrfFetch } from "./csrf";

const ALL_ATTENDEES = 'attendees/all';
const REQUEST = 'attendees/request';
const APPROVE = 'attendees/approve';
const DELETE = 'attendees/delete';

const loadAllAttendees = (attendees) => ({
    type: ALL_ATTENDEES,
    attendees
});

const requestAttendance = (attendee) => ({
    type: REQUEST,
    attendee
});

const approveAttendance = (attendee) => ({
    type: APPROVE,
    attendee
});

const deleteAttendance = (attendee) => ({
    type: DELETE,
    attendee
});

export const rsvpEvent = (eventId, rsvp) => async(dispatch) => {
    const response = await  csrfFetch(`/api/${eventId}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(rsvp)
    });

    if (response.ok) {
        const attendance = await response.json();
        dispatch(requestAttendance(attendance));
    }
}

const initialState = {
    allAttendances: {},
    singleAttendance: {}
}

const rsvpReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        // case REQUEST: {
        //     newState = { allAttendances: { ...state.allAttendances }, singleAttendance: {}};
        //     newState.allAttendances[action.eventId] = action.
        // }
        default: {
            return state;
        }
    }
}

export default rsvpReducer;
