import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const editService = createAsyncThunk(
    'fetch/editService',
    async (props) => {
        const dispatch = props.dispatch;
        dispatch(editServiceRequest());
        try {
            const response = await fetch(process.env.REACT_APP_API_URL, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(props.editObj)});
            if (!response.ok) {
                dispatch(editServicesFailure(response.statusText));
            }
            dispatch(editServiceSuccess());
            dispatch(editServiceClear());
        } catch(e) {
            dispatch(editServicesFailure(e.message));
        }
    }
);

const initialState = {success: false, load: false, err: null};

export const serviceEditReducer = createSlice(
    {
        name: 'serviceEdit',
        initialState,
        reducers: {
            editServiceRequest(state) {
                state.load = true;
            },
            editServicesFailure(state, action) {
                state.err = action.payload;
                state.load = false;
            },
            editServiceSuccess(state) {
                state.success = true;
                state.load = false;
            },
            editServiceClear(state) {
                state.success = false;
            }
        }
    }
);

export const {editServiceRequest, editServicesFailure, editServiceSuccess, editServiceClear} = serviceEditReducer.actions;
export default serviceEditReducer.reducer;
