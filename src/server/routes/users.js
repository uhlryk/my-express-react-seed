import express from 'express';
import httpStatus from 'http-status-codes';

let router = new express.Router();

router.post('/users', (req, res) => {
  var logger = req.app.get('logger');
  var actions = req.app.get('actions');
  actions.users.create({
    email: req.body.email,
    password: req.body.password
  }, (err, item) => {
    if(err && err.type === 'VALIDATION') {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
    } else if(err) {
      logger.error('server error users', err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
    res.status(httpStatus.OK).json(item);
  });
});

export default router;
