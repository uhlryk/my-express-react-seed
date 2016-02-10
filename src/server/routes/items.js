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

router.post('/items', (req, res) => {
  var logger = req.app.get('logger');
  var actions = req.app.get('actions');
  actions.items.create({
    name: req.body.name
  }, (err, item) => {
    if(err && err.type === 'VALIDATION') {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
    } else if(err) {
      logger.error('DB error item', err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
    res.status(httpStatus.OK).json(item);
  });
});

router.route('/items/:id')
  .get((req, res) => {
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
      res.status(httpStatus.OK).json(items[0]);
    });
  })
  .put((req, res) => {
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
      actions.items.update(items[0], {
        name: req.body.name
      }, (err, item) => {
        if(err && err.type === 'VALIDATION') {
          return res.status(httpStatus.UNPROCESSABLE_ENTITY).end();
        } else if(err) {
          logger.error('DB error item', err);
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
        }
        res.status(httpStatus.OK).json(item);
      });
    });
  })
  .delete((req, res) => {
    var logger = req.app.get('logger');
    var models = req.app.get('models');

    models.item.findOne({
      where: {
        id: req.params.id
      }
    }).then((item) => {
      if (item === null) {
        res.status(httpStatus.NOT_FOUND).end();
        return;
      }
      return item.destroy();
    }).then(() => {
      res.status(httpStatus.OK).json(item);
    }).catch((err) => {
      logger.error('DB error items', err);
      return res.status(httpStatus.NOT_FOUND).end();
    });
  });

export default router;
