import {UserDetailAction} from "../util/Action";

const initialState = {};

export function userDetailReducer(state = initialState, action) {
    switch (action.type) {
        case UserDetailAction.SAVE_USER_DETAIL:
            return state = {...action.payload};
        default:
            return {...state};
    }
}
