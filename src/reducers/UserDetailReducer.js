import {UserDetailAction} from "../util/Action";

const initialState = {
    username: null,
    roles: [],
    userDetail: {}
};

export function userDetailReducer(state = initialState, action) {
    switch (action.type) {
        case UserDetailAction.SAVE_USER_DETAIL:
            return {...state, user: action.payload};
        default:
            return {...state};
    }
}
