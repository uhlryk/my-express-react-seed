import express from 'express';
import httpStatus from 'http-status-codes';

let router = new express.Router();

router.delete('/items/:id', (req, res) => {
  var logger = req.app.get('logger');
  var actions = req.app.get('actions');
  actions.items.list({
    id: req.params.id
  }, (err, items) => {
    if(err) {
      logger.error('DB error item', err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
    if(!items || items.length === 0) {
      return res.status(httpStatus.NOT_FOUND).end();
    }
    actions.items.delete(items[0], (err) => {
      if(err) {
        logger.error('DB error item', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
      }
      res.status(httpStatus.OK).end();
    });
  });
});

export default router;
