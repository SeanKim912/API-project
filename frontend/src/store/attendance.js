import { csrfFetch } from "./csrf";

const ALL_ATTENDEES = 'attendees/all';
const REQUEST = 'attendees/request';
const DELETE = 'attendees/delete';

const loadAllAttendees = (attendees) => ({
    type: ALL_ATTENDEES,
    attendees
});

const requestAttendance = (attendee) => ({
    type: REQUEST,
    attendee
});

const deleteAttendance = (attendee) => ({
    type: DELETE,
    attendee
});

export const getAttendees = (eventId) => async(dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}/attendees`)

    if (response.ok) {
        const attendees = await response.json();
        dispatch(loadAllAttendees(attendees));
        return attendees;
    }
}

export const rsvpEvent = (eventId) => async(dispatch) => {
    const response = await  csrfFetch(`/api/${eventId}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
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
        case ALL_ATTENDEES: {
            newState = { allAttendances: {}, singleAttendance: {} };
            console.log("ATTEND ACTION", action.attendees);
            action.attendees.Attendees.forEach((attendee) => {
                newState.allAttendances[attendee.id] = attendee;
            });
            return newState;
        }
        case REQUEST: {
            newState = { allAttendances: { ...state.allAttendances }, singleAttendance: {}};
            newState.allAttendances[action.attendance.id] = action.attendance;
            newState.singleAttendance = action.attendance;
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default rsvpReducer;
