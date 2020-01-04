import { ServicesAction } from "../util/Action";

const initialState= {
    services: []
}

export function serviceReducer (state = initialState, action){
    switch (action.type){
        case ServicesAction.FETCH_SERVICES:
            return {...state, services: action.payload};
        default:
            return {...state};
    }
}