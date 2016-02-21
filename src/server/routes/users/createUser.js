import express from 'express';
import httpStatus from 'http-status-codes';

let router = new express.Router();

router.post('/users', (req, res) => {
  var logger = req.app.get('logger');
  var config = req.app.get('config');
  var actions = req.app.get('actions');
  var models = req.app.get('models');

  req.checkGroup('password');
  req.checkGroup('email');
  var errors = req.validationErrors();
  if (errors) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
  }
  var email = req.body.email;
  var password = req.body.password;

  actions.users.hashPassword(password, (err, hashPassword) => {
    if (err) {
      logger.error('DB erro find reset user password configrmation', err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
    actions.users.create({
      email: email,
      password: hashPassword,
      status: config.enableEmailActivation === true ? models.user.STATUS.INACTIVE : models.user.STATUS.ACTIVE
    }, (err, user) => {
      if (err) {
        logger.error('server error users', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
      }
      if (config.enableEmailActivation) {
        actions.users.createActivationToken({
          id: user.id
        }, (err, tokenResponse) => {
          actions.users.sendActivationEmail({
            token: tokenResponse,
            targetEmail: user.email
          }, (error, response) => {
            if (error) {
              logger.error('send activation email error', error);
            }
            res.status(httpStatus.OK).end();
          });
        });
      } else {
        res.status(httpStatus.OK).end();
      }
    });
  });
});

export default router;
