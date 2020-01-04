import { ReportAction } from "../util/Action";

const initialState = {
    reports: []
}

export function reportReducer (state = initialState, action){
    switch (action.type) {
        case ReportAction.FETCH_REPORTS:
            return {...state, reports: action.payload};
        default:
            return {...state};
    }
}