import {combineReducers, configureStore} from '@reduxjs/toolkit';
import servicesFetchReducer from "./Slices/servicesFetchSlice";
import serviceFetchReducer from "./Slices/serviceFetchSlice";
import editService from "./Slices/serviceEditSlice";
const rootReducer = combineReducers({servicesFetch: servicesFetchReducer, serviceFetch: serviceFetchReducer, editService: editService});

export const store = configureStore({
    reducer: rootReducer,
});