import React from 'react'
import ReactDOM from 'react-dom';

import { browserHistory } from 'react-router';
import App from './App.jsx';

const initialState = window.__INITIAL_STATE__

ReactDOM.render(<App history={browserHistory} initialState={initialState} />, document.getElementById('root'));
