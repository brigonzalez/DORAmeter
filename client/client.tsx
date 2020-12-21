import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Apps from './components/Apps';

import './css/main.scss';

const App = () =>
    <div className={'DORAmeter-app'}>
        <Header />
        <Apps />
    </div>;

ReactDOM.render(<App />, document.querySelector('#app'));
