import express from 'express';
import httpStatus from 'http-status-codes';
import ValidationError from '../errors/ValidationError';

let router = new express.Router();

router.post('/authentications/', function(req, res, next){
  var logger = req.app.get('logger');
  var actions = req.app.get('actions');
  var models = req.app.get('models');

  actions.users.list({
    email: req.body.email,
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
    actions.authentications.comparePassword(req.body.password, users[0].password, (error, response) => {
      if(response === true) {
        actions.authentications.createToken({
          id: users[0].id
        }, (error, tokenReponse) => {
          res.status(httpStatus.OK).json({
            token: tokenReponse.token
          });
        });
      } else { //wrong password
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
      }
    });
  });
});

export default router;
