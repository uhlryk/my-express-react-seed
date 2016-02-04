import winston from 'winston';
import path from 'path';
import fs from 'fs';

class Logger{
  static CONSOLE_ALL = 'all';
  static CONSOLE_ERROR = 'error';
  static CONSOLE_MUTE = 'mute';

  constructor(logPath = './log') {
    if (!fs.existsSync(logPath)){
      fs.mkdirSync(logPath);
    }
    var mode = Logger.CONSOLE_ALL;
    if (process && process.env && process.env.CONSOLE_LOG){
      mode = process.env.CONSOLE_LOG;
    }

    this.logger = new (winston.Logger)();

    this.logger.add(winston.transports.File, {
      name:'log.error',
      level: 'error',
      filename: path.join(logPath, 'error.log'),
      // handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    });
    this.logger.add(winston.transports.File, {
      name:'log.info',
      level: 'info',
      filename: path.join(logPath, 'info.log'),
      // handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    });
    switch (mode) {
      case Logger.CONSOLE_ALL:
        this.logger.add(winston.transports.Console, {
          level: 'debug',
          // handleExceptions: true,
          json: false,
          colorize: true
        });
        break;
      case Logger.CONSOLE_ERROR:
        this.logger.add(winston.transports.Console, {
          level: 'error',
          // handleExceptions: true,
          json: false,
          colorize: true
        });
        break;
      default:
    }
  }

  log(level, msg, meta = null) {
    return this.logger.log(level, msg, meta);
  }
  debug(msg, meta = null) {
    return this.logger.debug(msg, meta);
  }
  info(msg, meta = null) {
    return this.logger.info(msg, meta);
  }
  warn(msg, meta = null) {
    return this.logger.warn(msg, meta);
  }
  error(msg, meta = null) {
    return this.logger.error(msg, meta);
  }

}

export default Logger;
