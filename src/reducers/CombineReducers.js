import {combineReducers} from "redux";
import {userDetailReducer} from "./UserDetailReducer";
import {usersReducer} from "./UsersReducer";
import {itemReducer} from './ItemReducer';
import {serviceReducer} from './ServiceReducer';
import {operatorReducer} from './OperatorReducer';
import {reportReducer} from './ReportReducer';
import {storesReducer} from "./StoresReducer";

export const reducers = combineReducers({
    user: userDetailReducer,
    users: usersReducer,
    items: itemReducer,
    services: serviceReducer,
    operators: operatorReducer,
    reports: reportReducer,
    stores: storesReducer,
});
