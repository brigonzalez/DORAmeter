import * as React from 'react';
import ReactDOM from 'react-dom';
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import {UserList} from './components/users.js';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () =>
    <Admin
        dataProvider={dataProvider}
    >
        <Resource
            list={UserList}
            name="users"
        />
    </Admin>;

ReactDOM.render(<App />, document.querySelector('#app'));
