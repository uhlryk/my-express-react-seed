import express from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http';
import Logger from './utils/Logger';
import apiRoutes from './apiRoutes/index';
import clientRoutes from './clientRoutes/index';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import _ from 'lodash';

import onNewDb from './hooks/onNewDb';
import onServerStart from './hooks/onServerStart';
import Models from './models/index';
import EmailSender from './utils/EmailSender';
import Actions from './actions/index';
import validationGroups from './validations/groups/index';
import customValidators from './validations/validators/index';
import customSanitizers from './validations/sanitizers/index';

export function config(config = {}, callbacks = {}) {
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

  var emailSender = EmailSender({
    logger: logger,
    config: config,
    templateDir: path.join(__dirname, 'emailTemplates')
  });

  var actions = Actions({
    logger: logger,
    models: models,
    config: config,
    emailSender: emailSender
  });

  var app = express();

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, access-token');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    if ('OPTIONS' === req.method) {
      res.status(204).send();
    }
    else {
      next();
    }
  });

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

  app.use('/api', apiRoutes);

  if(callbacks.onBeforeClientMiddleware) {
    callbacks.onBeforeClientMiddleware(app);
  }

  app.use('/static',express.static(path.join(__dirname, 'client')));

  app.use(clientRoutes);

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



  return {
    listen: (callback = null) => {
      models.sequelize.sync({
        force: config.dropDb
      }).then(() => {
        if(config.dropDb) {
          return onNewDb({
            logger: logger,
            models: models,
            config: config,
            actions: actions
          });
        }
      }).then(() => {
        return onServerStart({
          logger: logger,
          models: models,
          config: config,
          actions: actions
        });
      }).then(() => {
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
    },
  };
};
