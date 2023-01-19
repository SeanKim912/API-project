import { csrfFetch } from "./csrf";

const ALL_EVENTS = 'events/all';
const USER_EVENTS = 'events/user';
const LOAD_EVENT = 'events/one';
const CREATE = 'events/create';
const EDIT = 'events/edit';
const DELETE = 'events/delete';
// const CLEAR = 'events/clear';

const loadAllEvents = (events) => ({
    type: ALL_EVENTS,
    events
});

// const loadUserEvents = (events) => ({
//     type: USER_EVENTS,
//     events
// });

const loadEvent = (event) => ({
    type: LOAD_EVENT,
    event
})

const createEvent = (event) => ({
    type: CREATE,
    event
});

const editEvent = (event) => ({
    type: EDIT,
    event
});

const deleteEvent = (event) => ({
    type: DELETE,
    event
});

// export const clearEvent = () => ({
//     type: CLEAR
// })

export const getAllEvents = () => async(dispatch) => {
    const response = await csrfFetch('/api/events');

    if (response.ok) {
        const events = await response.json();
        dispatch(loadAllEvents(events));
        return events;
    }
}

// export const getUserEvents = () => async(dispatch) => {
//     const response = await csrfFetch('/api/events/current');

//     if (response.ok) {
//         const events = await response.json();
//         dispatch(loadUserEvents(events));
//         return events;
//     }
// }

export const getEvent = (eventId) => async(dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`);

    if (response.ok) {
        const details = await response.json();
        dispatch(loadEvent(details));
        return details;
    }
}

export const startEvent = (groupId, newEvent, newImage) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
    });
    
    if (response.ok) {
        const event = await response.json();
        const imageResponse = await csrfFetch(`/api/events/${event.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newImage)
        });
            if (imageResponse.ok) {
                const eventImage = await imageResponse.json();
                dispatch(getEvent(event.id));
                return eventImage;
            }
        dispatch(createEvent(event));
        return event;
    }
}

export const updateEvent = (event) => async(dispatch) => {
    const response = await csrfFetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    });

    if (response.ok) {
        const updatedEvent = await response.json();
        dispatch(editEvent(updatedEvent));
        return updatedEvent;
    }
}

export const removeEvent = (eventId) => async(dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const removedEvent = await response.json();
        dispatch(deleteEvent(removedEvent));
    }
}

const initialState = {
    allEvents: {},
    singleEvent: {}
}

const eventReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_EVENTS: {
            newState = { allEvents: {}, singleEvent: {} };
            action.events.Events.forEach((event) => {
                newState.allEvents[event.id] = event;
            });
            return newState;
        }
        case USER_EVENTS: {
            newState = { allEvents: {}, singleEvent: {} };
            action.events.Events.forEach((event) => {
                newState.allEvents[event.id] = event;
            });
            return newState;
        }
        case LOAD_EVENT: {
            newState = { ...state, singleEvent: {}};
            newState.singleEvent = { ...action.event };
            return newState;
        }
        case CREATE: {
            newState = { allEvents: { ...state.allEvents }, singleEvent: {}};
            newState.allEvents[action.newEvent.id] = action.newEvent;
            newState.singleEvent = action.newEvent;
            return newState;
        }
        case EDIT: {
            newState = { ...state, singleEvent: {}};
            newState.allEvents[action.event.id] = action.event;
            newState.singleEvent = action.event;
            return newState;
        }
        case DELETE: {
            // newState = { ...state };
            // delete newState[action.eventId];
            // newState.singleEvent = {};
            // return newState;
            newState = { ...state };
            delete newState.allEvents[action.eventId];
            newState.singleEvent = {};
            return newState;
        }
        // case CLEAR: {
        //     return initialState;
        // }
        default: {
            return state;
        }
    }
}


export default eventReducer;
