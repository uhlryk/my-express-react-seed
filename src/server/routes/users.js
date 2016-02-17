import express from 'express';
import httpStatus from 'http-status-codes';
import validator from 'validator';

let router = new express.Router();

router.post('/users/activate', (req, res) => {
  var logger = req.app.get('logger');
  var config = req.app.get('config');
  var actions = req.app.get('actions');
  var models = req.app.get('models');

  actions.users.verifyActivationToken(req.body.token, (err, response) => {
    if(err) {
      logger.error('server error activation users', err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
    actions.users.list({
      id: response.id,
      status: models.user.STATUS.INACTIVE
    }, (err, users) => {
      if(err) {
        logger.error('DB error find activation user', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
      }
      if(!users || users.length === 0) {
        return res.status(httpStatus.NOT_FOUND).end();
      }

      actions.users.update(users[0], {
        status: models.user.STATUS.ACTIVE
      }, (err, user) => {
        if(err) {
          logger.error('DB error update status user', err);
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
        }
        res.status(httpStatus.OK).end();
      });
    });
  });
});

router.post('/users', (req, res) => {
  var logger = req.app.get('logger');
  var config = req.app.get('config');
  var actions = req.app.get('actions');
  var models = req.app.get('models');

  var email = validator.trim(req.body.email).toLowerCase();
  var password = req.body.password;
  if(email && validator.isEmail(email) && validator.isLength(email, {min:3, max:60})) {
    if(password && validator.isLength(password, {min:6, max:60})) {
      actions.users.create({
        email: email,
        password: password,
        status: config.enableEmailActivation === true ? models.user.STATUS.INACTIVE : models.user.STATUS.ACTIVE
      }, (err, user) => {
        if(err) {
          logger.error('server error users', err);
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
        }
        if(config.enableEmailActivation) {
          actions.users.createActivationToken({
            id: user.id
          }, (err, tokenResponse) => {
            actions.users.sendActivationLink({
              token: tokenResponse.token,
              targetEmail: user.email
            }, (error, response) => {
              if(error) {
                logger.error('send activation email error', error);
              }
              res.status(httpStatus.OK).end();
            });
          });
        } else {
          res.status(httpStatus.OK).end();
        }
      });
    } else {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
    }
  } else {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
  }
});

export default router;
