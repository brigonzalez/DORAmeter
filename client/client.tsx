import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';

import Header from './components/Header';
import Apps from './components/Apps';
// @ts-ignore
import favicon from './assets/favicon.ico';

import './css/main.scss';

const App = () =>
    <>
        <Favicon url={favicon} />
        <Header />
        <Apps />
    </>;

ReactDOM.render(<App />, document.querySelector('#app'));
