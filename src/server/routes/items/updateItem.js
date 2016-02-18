import express from 'express';
import httpStatus from 'http-status-codes';

let router = new express.Router();

router.put('/items/:id', (req, res) => {
  var logger = req.app.get('logger');
  var actions = req.app.get('actions');
  req.checkGroup('name');
  var errors = req.validationErrors();
  if (errors) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
  }
  var name = req.body.name;
  actions.items.list({
    id: req.params.id
  }, (err, items) => {
    if (err) {
      logger.error('DB error item', err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
    if (!items || items.length === 0) {
      return res.status(httpStatus.NOT_FOUND).end();
    }
    actions.items.update(items[0], {
      name
    }, (err, item) => {
      if (err) {
        logger.error('DB error item', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
      }
      res.status(httpStatus.OK).json(item);
    });
  });
})

export default router;
