import React, {useState} from "react";
import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";
import {ErrorComponent} from "../ErrorComponent/ErrorComponent";
import {editService} from "../../store/Slices/serviceEditSlice";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";

export function Form (props) {
    const {success, load, err} = useSelector((state) => state.editService);
    const [state, setState] = useState({name: props.name, price: props.price, description: props.description});
    const dispatch = useDispatch();
    const handleInputChange = (e) => {
        e.preventDefault();
        setState({...state, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const editObj = {id: props.serviceId, name: state.name, price: state.price, content: state.description};
        dispatch(editService({dispatch, editObj}));
    }

    return(
        <form className={'EditServiceForm'} onSubmit={handleSubmit}>
            {success && <Redirect to={'/services'}/>}
            <label htmlFor={'NameService'}>Название</label>
            <input id={'NameService'} type={'text'} className={'NameService'} name={'name'} value={state.name}
                   onChange={handleInputChange} required={true}/>
            <label htmlFor={'PriceService'}>Цена</label>
            <input id={'PriceService'} type={'text'} className={'PriceService'} name={'price'} value={state.price}
                   onChange={handleInputChange} required={true}/>
            <label htmlFor={'DescriptionService'}>Описание</label>
            <input id={'DescriptionService'} type={'text'} className={'DescriptionService'} name={'description'}
                   value={state.description} onChange={handleInputChange} required={true}/>
            <div className={'ButtonsBlock'}>
                <Link to={'/services'} className={'CancelButton'}>Отмена</Link>
                <button type={'submit'} className={'ChangeButton'}>
                    {
                        (
                            load &&
                            <Loader type="TailSpin" color="white" height={15} width={15}/>
                        ) || (!load && 'Изменить')
                    }
                </button>
                {err && <ErrorComponent />}
            </div>
        </form>
    )
}