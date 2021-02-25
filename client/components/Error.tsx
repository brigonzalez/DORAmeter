import React from 'react';

// @ts-ignore
import ErrorLogo from '../assets/Error.svg';

const Error = () =>
    <div className={'alert-message'}>
        <img
            alt={'Error logo'}
            className={'error-logo'}
            src={ErrorLogo}
        />
        <p>{'Something went wrong. Please try again.'}</p>
    </div>;

export default Error;
