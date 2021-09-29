import {
    FETCH_SERVICE_FAILURE,
    FETCH_SERVICE_REQUEST, FETCH_SERVICE_SUCCESS
} from '../actions/actionTypes'

const initialState = {
    item: {name: '', price: '', description: ''},
    loading: false,
    error: null,
};

export function serviceFetchReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SERVICE_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_SERVICE_FAILURE:
            const {error} = action.payload;
            return {...state, loading: false, error};
        case FETCH_SERVICE_SUCCESS:
            const service = action.payload;
            state.item.name = service.name;
            state.item.price = service.price;
            state.item.description = service.content;
            return {...state, loading: false, error: null}
        default:
            return state;
    }
}
