import React from 'react'
import ReactDOM from 'react-dom';
import style from './sass/style.scss';
import config from '../configs/client.local';
import { browserHistory } from 'react-router';
import App from './App.jsx';

const initialState = window.__INITIAL_STATE__

ReactDOM.render(<App config={config} history={browserHistory} initialState={initialState} />, document.getElementById('root'));
