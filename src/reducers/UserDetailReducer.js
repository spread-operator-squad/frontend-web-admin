import {UserDetailAction} from "../util/Action";

const initialState = {
    id: null,
    username: null,
    roles: [],
    userDetail: {
        name: null,
        phoneNumber: null,
        birthDate: null,
    }
};

export function userDetailReducer(state = initialState, action) {
    switch (action.type) {
        case UserDetailAction.SAVE_USER_DETAIL:
            return state = {...action.payload};
        default:
            return {...state};
    }
}
