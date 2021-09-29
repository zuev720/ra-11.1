import {
    EDIT_SERVICE_CLEAR,
    EDIT_SERVICE_FAILURE,
    EDIT_SERVICE_REQUEST,
    EDIT_SERVICE_SUCCESS
} from '../actions/actionTypes';

const initialState = {success: false, load: false, err: null};

export function serviceEditReducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_SERVICE_REQUEST:
            return {...state, success: false, load: true, err: null};
        case EDIT_SERVICE_FAILURE:
            const error = action.payload;
            return {...state, success: false, load: false, err: error};
        case EDIT_SERVICE_SUCCESS:
            return {...state, success: true, load: false, err: null};
        case EDIT_SERVICE_CLEAR:
            return initialState;
        default:
            return state;
    }
}
