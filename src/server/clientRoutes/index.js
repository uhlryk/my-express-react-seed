import express from 'express';
let router = new express.Router();
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory } from 'react-router';
import App from '../../client/App.jsx';
import clientConfig from '../../configs/client.local';

router.use('/*', function(req, res){
  const history = createMemoryHistory(req.originalUrl || '/');
  const initialState = {};
  let staticHTML = ReactDOMServer.renderToString(
    React.createFactory(App)({
      config: clientConfig,
      history,
      initialState
    })
  );

  res.render('index', {
    staticHTML,
    initialState: JSON.stringify(initialState)
  });
});

export default router;
