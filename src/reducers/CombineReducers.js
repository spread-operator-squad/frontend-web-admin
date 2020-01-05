import {combineReducers} from "redux";
import {usersReducer} from "./UsersReducer";
import {itemReducer} from './ItemReducer';
import {serviceReducer} from './ServiceReducer';
import {operatorReducer} from './OperatorReducer';
import {reportReducer} from './ReportReducer';
import {storesReducer} from "./StoresReducer";

export const reducers = combineReducers({
    users: usersReducer,
    items: itemReducer,
    services: serviceReducer,
    operators: operatorReducer,
    reports: reportReducer,
    stores: storesReducer,
});
