import React from 'react';
import ReactDOM from 'react-dom';

const App = ({name}) =>
    <div>
        <h1>{`Hello ${name}`}</h1>
    </div>;

ReactDOM.render(<App name="Brian" />, document.querySelector('#app'));
