import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import AppDetails from './components/AppDetails';

import './css/app.scss';

const App = () =>
    <div className={'app'}>
        <Header />
        <AppDetails />
    </div>;

ReactDOM.render(<App />, document.querySelector('#app'));
