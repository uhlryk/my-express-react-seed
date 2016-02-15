import express from 'express';
import httpStatus from 'http-status-codes';
import ValidationError from '../../errors/ValidationError';
import items from '../items';

let router = new express.Router();

router.use('/accounts/', (req, res, next) => {
  var logger = req.app.get('logger');
  var models = req.app.get('models');
  var token = req.headers['access-token'] || req.query['access-token'];
  req.user = null;
  if(token){

    var actions = req.app.get('actions');
    actions.authentications.verifyToken(token, (err, response) => {
      if(err) {
        logger.warn('verify token', err);
        return res.status(httpStatus.UNAUTHORIZED).send('Access denied');
      }
      actions.users.list({
        id: response.id,
        status: models.user.STATUS.ACTIVE
      }, (err, users) => {

        if(err instanceof ValidationError) {
          return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
        } else if(err) {
          logger.error('server error users', err);
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
        }
        if(!users || users.length === 0) {
          return res.status(httpStatus.NOT_FOUND).end();
        }

        req.user = users[0];
        next();
      });
    });
  } else {
    return res.status(httpStatus.UNAUTHORIZED).send('Access denied');
  }
});

router.use('/accounts', items);

router.get('/accounts', (req, res) => {
  res.status(200).send('App is running');
});

export default router;
