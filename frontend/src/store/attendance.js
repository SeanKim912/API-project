import { csrfFetch } from "./csrf";

const ALL_ATTENDEES = 'attendees/all';
const REQUEST = 'attendees/request';
const DELETE = 'attendees/delete';
const CONFIRM_ATTENDANCE = 'attendees/confirm'

const loadAllAttendees = (attendees) => ({
    type: ALL_ATTENDEES,
    attendees
});

const attendeeConfirm = (attendee) => ({
    type: CONFIRM_ATTENDANCE,
    attendee
})

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

export const confirmAttendee = (eventId) => async(dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}/attending`)

    if (response.ok) {
        const attendee = await response.json();
        dispatch(attendeeConfirm(attendee));
        return attendee;
    }
}

export const rsvpEvent = (eventId) => async(dispatch) => {
    const response = await  csrfFetch(`/api/events/${eventId}/attendance`, {
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
            newState = { allAttendances: {}, singleAttendance: { ...state.singleAttendance } };
            action.attendees.Attendees.forEach((attendee) => {
                newState.allAttendances[attendee.id] = attendee;
            });
            return newState;
        }
        case CONFIRM_ATTENDANCE: {
            newState = { allAttendances: { ...state.allAttendances }, singleAttendance: {} };
            newState.singleAttendance = action.attendee;
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
