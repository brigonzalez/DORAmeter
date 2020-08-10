import * as React from 'react';
import ReactDOM from 'react-dom';
import {Admin, Resource} from 'react-admin';

const App = () =>
    <Admin>
        <Resource
            name="users"
        />
    </Admin>;

ReactDOM.render(<App />, document.querySelector('#app'));
