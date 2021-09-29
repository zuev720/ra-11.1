import {createStore, combineReducers} from 'redux';
import {servicesFetchReducer} from '../reducers/servicesFetch';
import {serviceFetchReducer} from '../reducers/serviceFetch';
import {serviceEditReducer} from '../reducers/serviceEdit';

const reducer = combineReducers({
        servicesFetch: servicesFetchReducer,
        serviceFetch: serviceFetchReducer,
        serviceEditFetch: serviceEditReducer,
    }
)

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
