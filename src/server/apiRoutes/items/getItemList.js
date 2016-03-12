import express from 'express';
import httpStatus from 'http-status-codes';

let router = new express.Router();

router.get('/items', (req, res) => {
  var logger = req.app.get('logger');
  var actions = req.app.get('actions');

  req.sanitizeQuery('limit').listLimit({values:[10,20,30,40,50]});
  req.sanitizeQuery('page').listPage();

  actions.items.list({
    limit: req.query.limit,
    page: req.query.page,
    orderColumn: req.orderColumn,
    orderType: req.orderType
  }, (err, items) => {
    if(err) {
      logger.error('DB error item', err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
    res.status(httpStatus.OK).json(items);
  });
});

export default router;
