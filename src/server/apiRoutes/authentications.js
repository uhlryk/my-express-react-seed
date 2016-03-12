import express from 'express';
import httpStatus from 'http-status-codes';

let router = new express.Router();

router.post('/authentications/', function(req, res, next){
  var logger = req.app.get('logger');
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

  actions.users.list({
    where: {
      email: email,
      status: models.user.STATUS.ACTIVE
    }
  }, (err, users) => {
    if(err) {
      logger.error('server error users', err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
    if(!users || users.length === 0) {
      return res.status(httpStatus.NOT_FOUND).end();
    }
    actions.authentications.comparePassword(password, users[0].password, (error, response) => {
      if(response === true) {
        actions.authentications.createToken({
          id: users[0].id
        }, (error, tokenReponse) => {
          res.status(httpStatus.OK).json({
            token: tokenReponse
          });
        });
      } else { //wrong password
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
      }
    });
  });
});

export default router;
