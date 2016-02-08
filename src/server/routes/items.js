import express from 'express';
import httpStatus from 'http-status-codes';

let router = new express.Router();

router.get('/items', (req, res) => {
  var logger = req.app.get('logger');
  var models = req.app.get('models');
  models.item.findAll()
    .then((items) => {
      res.status(httpStatus.OK).json(items);
    })
    .catch((err) => {
      logger.error('DB error products', err);
      return res.status(httpStatus.NOT_FOUND).end();
    });
});

router.post('/items', (req, res) => {
  var logger = req.app.get('logger');
  var models = req.app.get('models');
  models.item.create({
    name: req.body.name
  }).then((item) => {
    res.status(httpStatus.OK).end();
  }).catch((err) => {
    logger.error('DB error items', err);
    return res.status(httpStatus.NOT_FOUND).end();
  });
});

router.route('/items/:id')
  .get((req, res) => {
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
      res.status(httpStatus.OK).json(item);
    }).catch((err) => {
      logger.error('DB error items', err);
      return res.status(httpStatus.NOT_FOUND).end();
    });
  })
  .put((req, res) => {
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
      item.name = req.body.name;
      return item.save();
    }).then((item) => {
      res.status(httpStatus.OK).json(item);
    }).catch((err) => {
      logger.error('DB error items', err);
      return res.status(httpStatus.NOT_FOUND).end();
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
