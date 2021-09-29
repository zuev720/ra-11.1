import React, {useState} from "react";
import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";
import {fetchServices} from "../../../actions/actionCreators";
import {useDispatch} from "react-redux";
import {ErrorComponent} from "../../ErrorComponent/ErrorComponent";

export function ServiceItem (props) {
    const initialState = {loading: false, error: null};
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    const handleRemove = async (id) => {
        setState({...state, loading: true});
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {method: 'DELETE', headers: {'Content-Type': 'application/json'}});
            if (!response.ok) {
                setState({...state, loading: false, error: response.statusText});
            }
            setState(initialState);
            await fetchServices(dispatch);
        } catch(e) {
            setState({...state, loading: false, error: e.message});
        }
    }

    return(
        <li key={props.id} className={'ServiceItem'}>
            {state.error && <ErrorComponent />}
            <div className={'ServiceWrapperValue'}>
                <span className={'ServiceValue'}>{props.name}</span>
                <span className={'ServiceValue'}>{props.price} ₽</span>
            </div>
            <div className={'ServiceListWrapperButtons'}>
                <Link className={'ServiceButton'} to={`/services/edit/${props.id}`}>✎</Link>
                <button className={'ServiceButton'} onClick={() => handleRemove(props.id)}>
                    {state.loading && <Loader type="TailSpin" color="white" height={12} width={12} />}
                    {!state.loading && '✕'}
                </button>
            </div>
        </li>
    )
}