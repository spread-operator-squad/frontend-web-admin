import { OperatorAction } from '../util/Action'

const initialState= {
    operators: []
}

export function operatorReducer (state = initialState, action){
    switch (action.type) {
        case OperatorAction.FETCH_OPERATORS:
            return {...state, operators: action.payload};
        default:
            return {...state};

    }
}