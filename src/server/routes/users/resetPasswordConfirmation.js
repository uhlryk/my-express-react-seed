import express from 'express';
import httpStatus from 'http-status-codes';

let router = new express.Router();

router.post('/users/resetPassword/confirmation', (req, res) => {
  var logger = req.app.get('logger');
  var config = req.app.get('config');
  var actions = req.app.get('actions');
  var models = req.app.get('models');

  req.checkGroup('password');
  var errors = req.validationErrors();
  if (errors) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
  }
  var password = req.body.password;

  actions.users.verifyResetPasswordToken(req.body.token, (err, response) => {
    if(err) {
      logger.error('server error reset user password configrmation', err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
    actions.users.list({
      id: response.id
    }, (err, users) => {
      if(err) {
        logger.error('DB error find reset user password configrmation', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
      }
      if(!users || users.length === 0 || users[0].status !== models.user.STATUS.ACTIVE) {
        return res.status(httpStatus.NOT_FOUND).end();
      }
      actions.users.hashPassword(password, (err, hashPassword) => {
        if (err) {
          logger.error('DB erro find reset user password configrmation', err);
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
        }
        actions.users.update(users[0], {
          password: hashPassword
        }, (err, user) => {
          if (err) {
            logger.error('DB erro find reset user password configrmation', err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
          }
          res.status(httpStatus.OK).end();
        });
      });
    });
  });
});

export default router;
