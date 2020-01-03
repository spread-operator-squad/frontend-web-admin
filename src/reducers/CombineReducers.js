import {combineReducers} from "redux";
import {userDetailReducer} from "./UserDetailReducer";
import {usersReducer} from "./UsersReducer";

export const reducers = combineReducers({
    user: userDetailReducer,
    users: usersReducer,
});
