import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {ServiceItem} from "../ServiceItem/ServiceItem";
import {ErrorComponent} from "../../ErrorComponent/ErrorComponent";
import {fetchServices} from "../../../store/Slices/servicesFetchSlice";

export function ServiceList() {
    const items = useSelector((state) => state.servicesFetch);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchServices(dispatch));
    }, [dispatch]);

    return (
        <ul className={'ServiceList'}>
            {items.error && <ErrorComponent />}
            {items.loading && <Loader type="TailSpin" color="#db3948" height={50} width={50}/>}
            {!items.loading && items.items.map((item) => <ServiceItem key={item.id} {...item} />)}
        </ul>
    )
}