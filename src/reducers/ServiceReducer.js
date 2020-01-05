import { ServicesAction } from "../util/Action";

const initialState= {
    services: [],
    serviceForm: {
        id: '',
        name: '',
        price: ''
    }
};

export function serviceReducer (state = initialState, action){
    switch (action.type){
        case ServicesAction.FETCH_SERVICES:
            return {...state, services: action.payload};
        case ServicesAction.SAVE_SERVICES_FORM:
            return {...state, serviceForm: action.payload};
        case ServicesAction.CLEAR_FORM:
            return {...state, serviceForm: {}};
        default:
            return {...state};
    }
}
