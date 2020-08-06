import * as React from 'react';
import ReactDOM from 'react-dom';
import {Admin, Resource} from 'react-admin';

import dataProvider from './data-provider';
import {UserList} from './components/users';

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
