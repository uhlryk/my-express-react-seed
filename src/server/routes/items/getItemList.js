import express from 'express';
import httpStatus from 'http-status-codes';

let router = new express.Router();

router.get('/items', (req, res) => {
  var logger = req.app.get('logger');
  var actions = req.app.get('actions');
  actions.items.list({
  }, (err, items) => {
    if(err) {
      logger.error('DB error item', err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
    res.status(httpStatus.OK).json(items);
  });
});

export default router;
