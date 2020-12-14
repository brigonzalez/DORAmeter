import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';

import './css/app.scss';

const App = () =>
    <div className={'app'}>
        <Header />
    </div>;

ReactDOM.render(<App />, document.querySelector('#app'));
