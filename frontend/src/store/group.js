import { csrfFetch } from "./csrf"

const ALL_GROUPS = 'groups/all'
const USER_GROUPS = 'groups/user'
const LOAD_ONE = 'groups/one'
const CREATE = 'groups/create'
const EDIT = 'groups/edit'
const DELETE = 'groups/delete'

const loadAllGroups = (groups) => ({
    type: ALL_GROUPS,
    groups
});

const loadUserGroups = (groups) => ({
    type: USER_GROUPS,
    groups
});

const loadGroup = (group) => ({
    type: LOAD_ONE,
    group
})

const createGroup = (group) => ({
    type: CREATE,
    group
});

const editGroup = (group) => ({
    type: EDIT,
    group
});

const deleteGroup = (group) => ({
    type: DELETE,
    group
});

export const getAllGroups = () => async(dispatch) => {
    const response = await csrfFetch('/api/groups');

    if (response.ok) {
        const groups = await response.json();
        dispatch(loadAllGroups(groups));
        return groups;
    }
}

export const getUserGroups = () => async(dispatch) => {
    const response = await csrfFetch('/api/groups/current');

    if (response.ok) {
        const groups = await response.json();
        dispatch(loadUserGroups(groups));
        return groups;
    }
}

export const getGroup = (group) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${group.id}`);

    if (response.ok) {
        const details = await response.json();
        dispatch(loadGroup(details));
        return details;
    }
}

export const startGroup = (newGroup) => async(dispatch) => {
    const response = await csrfFetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGroup)
    });

    if (response.ok) {
        const group = await response.json();
        dispatch(createGroup(group));
        return group;
    }
}

export const updateGroup = (group) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groups.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group)
    });

    if (response.ok) {
        const updatedGroup = await response.json();
        dispatch(editGroup(updatedGroup));
        return updateGroup;
    }
}

export const removeGroup = (group) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${group.id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const removedGroup = await response.json();
        dispatch(deleteGroup(removedGroup));
        return removedGroup;
    }
}

const initialState = {
    allGroups: {},
    singleGroup: {}
}

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_GROUPS:
            let normalizedGroups = {};
            action.groups.forEach((group) => {
                normalizedGroups[group.id] = group;
            });
            return {
                ...state,
                ...normalizedGroups
            }
        case USER_GROUPS:
            return [...state, action.group]
        default:
            return state;
    }
}

export default groupReducer;
