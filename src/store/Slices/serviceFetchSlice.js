import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const serviceFetch = createAsyncThunk(
    'fetch/serviceFetch',
    async (props) => {
        const dispatch = props.dispatch;
        dispatch(fetchServiceRequest());
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${props.serviceId}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
                dispatch(fetchServiceFailure(response.statusText));
            }
            const data = await response.json();
            dispatch(fetchServiceSuccess(data));
        } catch (e) {
            dispatch(fetchServiceFailure(e.message));
        }
    }
);

const initialState = {
    item: {name: '', price: '', description: ''},
    loading: false,
    error: null,
};

export const serviceFetchReducer = createSlice(
    {
        name: 'fetchService',
        initialState,
        reducers: {
            fetchServiceRequest(state) {
                state.loading = true;
            },
            fetchServicesFailure(state, action) {
                state.error = action.payload;
                state.loading = false;
            },
            fetchServiceSuccess(state, action) {
                state.item.name = action.payload.name;
                state.item.price = action.payload.price;
                state.item.description = action.payload.content;
                state.loading = false;
            }
        }
    }
);


export const {fetchServiceRequest, fetchServiceFailure, fetchServiceSuccess} = serviceFetchReducer.actions;
export default serviceFetchReducer.reducer;