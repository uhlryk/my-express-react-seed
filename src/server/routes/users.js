import express from 'express';
import httpStatus from 'http-status-codes';
import ValidationError from '../errors/ValidationError';

let router = new express.Router();

router.post('/users', (req, res) => {
  var logger = req.app.get('logger');
  var config = req.app.get('config');
  var actions = req.app.get('actions');
  var models = req.app.get('models');
  actions.users.create({
    email: req.body.email,
    password: req.body.password,
    status: config.enableEmailActivation === true ? models.user.STATUS.INACTIVE : models.user.STATUS.ACTIVE
  }, (err, user) => {
    if(err instanceof ValidationError) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
    } else if(err) {
      logger.error('server error users', err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
    if(config.enableEmailActivation) {
      //TODO: send email
    } else {
      res.status(httpStatus.OK).end();
    }
  });
});

export default router;
