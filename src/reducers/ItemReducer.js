import { ItemAction } from "../util/Action";

const initialState= {
    items: []
}

export function itemReducer(state = initialState, action){
    switch (action.type) {
        case ItemAction.FETCH_ITEMS:
            return {...state, items: action.payload};
        default:
            return {...state};
    }
}