import express from 'express';
import httpStatus from 'http-status-codes';

let router = new express.Router();

router.post('/users/resetPassword', (req, res) => {
  var logger = req.app.get('logger');
  var config = req.app.get('config');
  var actions = req.app.get('actions');
  var models = req.app.get('models');

  req.checkGroup('email');
  var errors = req.validationErrors();
  if (errors) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
  }
  var email = req.body.email;

  actions.users.list({
    where: {
      email: email,
      status: models.user.STATUS.ACTIVE
    }
  }, (err, users) => {
    if(err) {
      logger.error('DB error find reset user password configrmation', err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
    if(!users || users.length === 0) {
      return res.status(httpStatus.NOT_FOUND).end();
    }
    actions.users.createResetPasswordToken({
      id: users[0].id
    }, (err, tokenResponse) => {
      actions.users.sendResetPasswordEmail({
        token: tokenResponse,
        targetEmail: users[0].email
      }, (error, response) => {
        if(error) {
          logger.error('send reset password email error', error);
        }
        res.status(httpStatus.OK).end();
      });
    });
  });
});

export default router;
