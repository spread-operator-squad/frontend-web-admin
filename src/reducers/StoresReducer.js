import {StoresAction} from "../util/Action";

const initialState = {
  stores: []
};

export function storesReducer (state = initialState, action){
    switch (action.type) {
        case StoresAction.FETCH_STORES:
            return {...state, stores: action.payload};
        default:
            return {...state};
    }
}
