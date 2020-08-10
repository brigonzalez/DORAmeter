import * as React from 'react';
import ReactDOM from 'react-dom';
import {Admin, Resource} from 'react-admin';

import dataProvider from './data-provider';

const App = () =>
    <Admin
        dataProvider={dataProvider}
    >
        <Resource
            name="users"
        />
    </Admin>;

ReactDOM.render(<App />, document.querySelector('#app'));
