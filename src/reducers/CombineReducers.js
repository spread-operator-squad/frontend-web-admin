import {combineReducers} from "redux";
import {userDetailReducer} from "./UserDetailReducer";
import {usersReducer} from "./UsersReducer";
import {itemReducer} from './ItemReducer';
import {serviceReducer} from './ServiceReducer';
import {operatorReducer} from './OperatorReducer';

export const reducers = combineReducers({
    user: userDetailReducer,
    users: usersReducer,
    items: itemReducer,
    services: serviceReducer,
    operators: operatorReducer,
});
