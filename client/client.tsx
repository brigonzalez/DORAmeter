import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';

import Layout from './components/Layout';
// @ts-ignore
import favicon from './assets/favicon.ico';

import './css/main.scss';

const Client = () =>
    <>
        <Favicon url={favicon} />
        <Layout />
    </>;

ReactDOM.render(<Client />, document.querySelector('#app'));
