import { csrfFetch } from "./csrf";

const GROUP_MEMBERSHIPS = 'memberships/group';
const REQUEST = 'memberships/request';
const APPROVE = 'memberships/approve';
const DELETE = 'memberships/delete';

const loadGroupMemberships = (memberships) => ({
    type: GROUP_MEMBERSHIPS,
    memberships
});

const requestMembership = (membership) => ({
    type: REQUEST,
    membership
});

const approveMembership = (membership) => ({
    type: APPROVE,
    membership
});

const deleteMembership = (membership) => ({
    type: DELETE,
    membership
})

export const groupMemberships = (groupId) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/members`)

    if (response.ok) {
        const memberships = await response.json();
        dispatch(loadGroupMemberships(memberships));
        return memberships;
    }
}

export const membershipRequest = (groupId) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        const membership = await response.json();
        dispatch(requestMembership(membership));
        return membership;
    }
}

export const membershipApproval = (groupId, membership) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(membership)
    });

    if (response.ok) {
        const membership = await response.json();
        dispatch(approveMembership(membership));
        return membership;
    }
}

export const membershipDelete = (groupId, membership) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(membership)
    });

    if (response.ok) {
        const deletedMembership = await response.json();
        dispatch(deleteMembership(deletedMembership));
        return deletedMembership;
    }
}

const initialState = {
    groupMemberships: {},
    singleMembership: {}
}

const membershipReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GROUP_MEMBERSHIPS: {
            newState = { groupMemberships: {}, singleMembership: {} };
            action.memberships.Members.forEach((member) => {
                newState.groupMemberships[member.id] = member;
            });
            return newState;
        }
        case REQUEST: {
            newState = { groupMemberships: { ...state.groupMemberships }, singleMembership: {}};
            newState.groupMemberships[action.membership.id] = action.membership;
            newState.singleMembership = action.membership;
            return newState;
        }
        case APPROVE: {
            newState = { ...state, singleMembership: {}};
            newState.groupMemberships[action.membership.id] = action.membership;
            newState.singleMembership = action.membership;
            return newState;
        }
        case DELETE: {
            newState = { ...state };
            console.log("ACTION?", action)
            delete newState.groupMemberships[action.membership.id];
            newState.singleMembership = {};
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default membershipReducer;
