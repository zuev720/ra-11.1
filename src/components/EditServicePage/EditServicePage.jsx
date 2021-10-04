import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {ErrorComponent} from "../ErrorComponent/ErrorComponent";
import {serviceFetch} from "../../store/Slices/serviceFetchSlice";
import {Form} from "./Form";

export function EditServicePage(props) {
    const serviceId = Number(props.match.params.id);
    const {item, loading, error} = useSelector((state) => state.serviceFetch);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(serviceFetch({dispatch, serviceId}));
    }, [dispatch, serviceId]);


    return (
        <div className={'EditServicePage'}>
            {loading && <Loader type="TailSpin" color="#db3948" height={50} width={50}/>}
            {error && <ErrorComponent />}
            {((item.name, item.price, item.description) && !loading) &&
            <Form
                serviceId={serviceId}
                name={item.name}
                price={item.price}
                description={item.description}
            />}
        </div>
    )
}
