import React from 'react';
import {ServiceList} from './ServiceList/ServiceList';

export function MainPage() {
    return(
        <div className={'ServicesPage'}>
            <ServiceList />
        </div>
    )
}
