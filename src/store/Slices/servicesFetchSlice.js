import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchServices = createAsyncThunk(
    'fetch/servicesFetch',
 async (dispatch) => {
    dispatch(fetchServicesRequest());
     try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) {
            dispatch(fetchServicesFailure(response.statusText));
        }
        const data = await response.json();
        dispatch(fetchServicesSuccess(data));
    } catch (e) {
        dispatch(fetchServicesFailure(e.message));
    }
});


const initialState = {
    items: [], loading: false, error: null
};

export const servicesFetchReducer = createSlice({
    name: 'servicesFetch',
    initialState,
    reducers: {
        fetchServicesRequest(state) {
            state.loading = true;
        },
        fetchServicesFailure(state, action) {
            state.error = action.payload.error;
            state.loading = false;
        },
        fetchServicesSuccess(state, action) {
            state.items = action.payload;
            state.loading = false;
        },
    },
});

export const {fetchServicesRequest, fetchServicesFailure, fetchServicesSuccess} = servicesFetchReducer.actions;

export default servicesFetchReducer.reducer;