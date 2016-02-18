import express from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http';
import Logger from './utils/Logger';
import routes from './routes/index';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import _ from 'lodash';

import serverConfig from '../configs/server';
import Models from './models/index';
import EmailSender from './utils/EmailSender';
import Actions from './actions/index';
import validationGroups from './validations/groups/index';
import customValidators from './validations/validators/index';
import customSanitizers from './validations/sanitizers/index';

export function run(localConfig = {}, callback = null) {
  var config = _.merge({}, serverConfig, localConfig);
  var logger = new Logger();

  var serverRootPath = __dirname;

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

  var emailSender = EmailSender({
    logger: logger,
    config: config,
    templateDir: path.join(serverRootPath, 'emailTemplates')
  });

  var actions = Actions({
    logger: logger,
    models: models,
    config: config,
    emailSender: emailSender
  });

  var app = express();

  app.use(bodyParser.json());
  app.use(expressValidator({
    customValidators: customValidators,
    customSanitizers : customSanitizers
  }));

  app.use(validationGroups());
  app.set('config', config);
  app.set('models', models);
  app.set('port', config.port);
  app.set('logger', logger);
  app.set('actions', actions);
  app.set('emailSender', emailSender);

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
    logger.error('Node.js Handler', error);
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

  models.sequelize.sync({
    force: config.dropDb
  }).then(function (){
    server.listen(app.get('port'), () => {
      if(callback) {
        callback({
          actions: actions,
          models: models
        });
      }
    });
  });

  return server;
};
