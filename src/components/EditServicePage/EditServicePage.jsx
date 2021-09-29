import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchService, requestServiceEdit} from '../../actions/actionCreators';
import {Redirect} from 'react-router';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {ErrorComponent} from "../ErrorComponent/ErrorComponent";

export function EditServicePage(props) {
    const serviceId = Number(props.match.params.id);
    const {item, loading, error} = useSelector((state) => state.serviceFetch);
    const {success, load, err} = useSelector((state) => state.serviceEditFetch);
    const dispatch = useDispatch();
    const [state, setState] = useState(item);

    const handleInputChange = (e) => {
        e.preventDefault();
        setState({...state, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        fetchService(dispatch, serviceId).then((result) => result);
    }, [dispatch, item, serviceId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const editObj = {id: serviceId, name: state.name, price: state.price, content: state.description};
        await requestServiceEdit(dispatch, editObj);
    }

    return (
        <div className={'EditServicePage'}>
            {success && <Redirect to={'/services'}/>}
            {loading && <Loader type="TailSpin" color="#db3948" height={50} width={50}/>}
            {error && <ErrorComponent />}
            {(state.name, state.price, state.description && !loading) && !success &&
            <form className={'EditServiceForm'} onSubmit={handleSubmit}>
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
            }
        </div>
    )
}
