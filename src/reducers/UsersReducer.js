import {UsersAction} from "../util/Action";

const initialState = {
    users: []
};

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case UsersAction.FETCH_USERS:
            return {...state, users: action.payload};
        default:
            return {...state};
    }
}
