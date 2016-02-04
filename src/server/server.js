import express from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http';
import Logger from './utils/Logger';
import routes from './routes/index';
import morgan from 'morgan';

export default function(config, callback) {

  var logger = new Logger();

  var app = express();

  app.set('port', 3000);
  app.set('logger', logger);

  app.use(morgan('combined',{
    stream: {
      write: (message) => {
        logger.info(message);
      }
    }
  }));

  app.use(routes);

  var server = http.createServer(app);

  app.use((err, req, res, next) => {
    res.sendData(err.status || 500, {
      message: err.message,
      error: {}
    });
  });

  server.on('error', (error) => {
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

  server.listen(app.get('port'), () => {
    callback();
  });

  return server;
};
