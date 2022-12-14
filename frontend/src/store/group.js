
const ALL_GROUPS = 'groups/all'
const USER_GROUPS = 'groups/user'
const CREATE_GROUP = 'groups/createGroup'
const DELETE_GROUP = 'groups/deleteGroup'

const loadAllGroups = (groups) => ({
    type: ALL_GROUPS,
    groups
});

export const getAllGroups = () => async(dispatch) => {
    const response = await fetch('/api/groups');

    const groups = await response.json();
    dispatch(loadAllGroups(groups))
}

const initialState = {}

const groupReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_GROUPS:
            const normalizedGroups = {};
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
