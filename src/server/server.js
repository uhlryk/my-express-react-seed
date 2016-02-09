import express from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http';
import Logger from './utils/Logger';
import routes from './routes/index';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import _ from 'lodash';

import serverConfig from '../configs/server';
import Models from './models/index';
import Actions from './actions/index';

export function run(localConfig = {}, callback = null) {
  var config = _.merge({}, serverConfig, localConfig);
  var logger = new Logger();

  var models = Models({
    name: config.db.name,
    user: config.db.user,
    password: config.db.password,
    port: config.db.port,
    host: config.db.host,
    dialect: config.db.dialect,
    logging: (args) => {
      logger.info(args);
    }
  });

  var actions = Actions({
    logger: logger,
    models: models
  });

  var app = express();

  app.use(bodyParser.json());

  app.set('config', config);
  app.set('models', models);
  app.set('port', config.port);
  app.set('logger', logger);
  app.set('actions', actions);

  app.use(morgan('combined',{
    stream: {
      write: (message) => {
        logger.info(message);
      }
    }
  }));

  app.use(routes);

  var server = http.createServer(app);

  app.use(function(err, req, res, next){
    logger.error('Express Handler ' + err.message + ' ' + err.stack);
    res.status(err.status || 500).end();
  });

  server.on('error', (error) => {
    logger.error('Node.js Handler', err);
    if (error.syscall !== 'listen') {
      throw error;
    }
    switch (error.code) {
      case 'EACCES':
        console.error(' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  server.on('listening', () => {
    logger.info('Listening on ' + app.get('port'));
  });
  server.on('close', () => {
    logger.info('Server Stopped');
  });

  models.sequelize
    .drop().then(function (){
      return models.sequelize.sync();
    })
    .then(function (){
      server.listen(app.get('port'), () => {
        if(callback) {
          callback();
        }
      });
    });

  return server;
};
