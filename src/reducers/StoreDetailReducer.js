const initialState = {
    id: null,
    name: null,
    ownerId: null,
    address: {
        description: null,
        latitude: null,
        longitude: null
    }
};

export function storeDetailFunction(state=initialState, action) {
    switch (action.type) {
        case 'SAVE_STORE_DETAIL' :
            return state = {...action.payload};
        default:
            return {...state};
    }
}
