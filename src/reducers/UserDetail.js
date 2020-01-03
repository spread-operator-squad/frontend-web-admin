import {UserDetailAction} from "../util/Action";

const initialState = {
    user: {
        username: null,
        roles: [],
        userDetail: {
            name: null,

        }
    }
};

export function userDetailReducer(state=initialState, action) {
    switch (action.type) {
        case UserDetailAction.SAVE_USER_DETAIL:
            return null;
        default: return {...state};
    }
}
