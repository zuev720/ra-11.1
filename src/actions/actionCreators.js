export function fetchServicesRequest() {
    return {
        type: 'FETCH_SERVICES_REQUEST',
    }
}

export function fetchServicesFailure(message) {
    return {
        type: 'FETCH_SERVICES_FAILURE',
        payload: {message},
    }
}

export function fetchServicesSuccess(items) {
    return {
        type: 'FETCH_SERVICES_SUCCESS',
        payload: {items},
    }
}

export async function fetchServices(dispatch) {
    dispatch(fetchServicesRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`, {method: 'GET', headers: {'Content-Type': 'application/json'}});
        if (!response.ok) {
            dispatch(fetchServicesFailure(response.statusText));
        }
        const data = await response.json();
        dispatch(fetchServicesSuccess(data));
    } catch (e) {
        dispatch(fetchServicesFailure(e.message));
    }
}

export function fetchServiceRequest() {
    return {
        type: 'FETCH_SERVICE_REQUEST',
    }
}

export function fetchServiceFailure(message) {
    return {
        type: 'FETCH_SERVICE_FAILURE',
        payload: {message},
    }
}

export function fetchServiceSuccess(item) {
    return {
        type: 'FETCH_SERVICE_SUCCESS',
        payload: item,
    }
}

export async function fetchService(dispatch, id) {
    dispatch(fetchServiceRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {method: 'GET', headers: {'Content-Type': 'application/json'}});
        if (!response.ok) {
            dispatch(fetchServiceFailure(response.statusText));
        }
        const data = await response.json();
        dispatch(fetchServiceSuccess(data));
    } catch (e) {
        dispatch(fetchServiceFailure(e.message));
    }
}

export function editServiceRequest() {
    return {
        type: 'EDIT_SERVICE_REQUEST',
    }
}

export function editServiceFailure(message) {
    return {
        type: 'EDIT_SERVICE_FAILURE',
        payload: {message},
    }
}

export function editServiceSuccess() {
    return {
        type: 'EDIT_SERVICE_SUCCESS',
    }
}

export function editServiceClear() {
    return {
        type: 'EDIT_SERVICE_CLEAR',
    }
}

export async function requestServiceEdit(dispatch, service) {
    dispatch(editServiceRequest());
    try {
        const response = await fetch(process.env.REACT_APP_API_URL, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(service)});
        if (!response.ok) {
            dispatch(editServiceFailure(response.statusText));
        }
        dispatch(editServiceSuccess());
        dispatch(editServiceClear());
    } catch(e) {
        dispatch(editServiceFailure(e.message));
    }
}
