import { csrfFetch } from "./csrf"

const ALL_GROUPS = 'groups/all';
const USER_GROUPS = 'groups/user';
const LOAD_ONE = 'groups/one';
const CREATE = 'groups/create';
const EDIT = 'groups/edit';
const DELETE = 'groups/delete';


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

export const getGroup = (groupId) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`);

    if (response.ok) {
        const details = await response.json();
        dispatch(loadGroup(details));
        return details;
    }
}

export const startGroup = (newGroup, newImage) => async(dispatch) => {
    const response = await csrfFetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGroup)
    });

    if (response.ok) {
        const group = await response.json();
        const imageResponse = await csrfFetch(`/api/groups/${group.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newImage)
        });
            if (imageResponse.ok) {
                const groupImage = await imageResponse.json();
                dispatch(getGroup(group.id));
                return groupImage;
            }
        dispatch(createGroup(group));
        return group;
    }
}

export const updateGroup = (group) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${group.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group)
    });

    if (response.ok) {
        const updatedGroup = await response.json();
        dispatch(editGroup(updatedGroup));
        return updatedGroup;
    }
}

export const removeGroup = (groupId) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const removedGroup = await response.json();
        dispatch(deleteGroup(removedGroup));
    }
}

const initialState = {
    allGroups: {},
    singleGroup: {}
}

const groupReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_GROUPS: {
            newState = { allGroups: {}, singleGroup: {} };
            action.groups.Groups.forEach((group) => {
                newState.allGroups[group.id] = group;
            });
            return newState;
        }
        case USER_GROUPS: {
            newState = { allGroups: {}, singleGroup: {} };
            action.groups.Groups.forEach((group) => {
                newState.allGroups[group.id] = group;
            });
            return newState;
        }
        case LOAD_ONE: {
            newState = { allGroups: {}, singleGroup: {}};
            newState.singleGroup = { ...action.group };
            return newState;
        }
        case CREATE: {
            newState.allGroups[action.newGroup.id] = action.newGroup;
            newState.singleGroup = action.newGroup;
            return newState;
        }
        case EDIT: {
            newState.allGroups[action.group.id] = action.group;
            newState.singleGroup = action.group;
            return newState;
        }
        case DELETE: {
            newState = { ...state };
            delete newState[action.groupId];
            newState.singleGroup = {};
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


export default groupReducer;
