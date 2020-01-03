import {combineReducers} from "redux";
import {userDetailReducer} from "./UserDetailReducer";

export const reducers = combineReducers({
    userDetail: userDetailReducer,
});
