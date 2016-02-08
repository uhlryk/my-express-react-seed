import express from 'express';

import items from './items';

let router = new express.Router();

router.use(items);

router.get('/', (req, res) => {
  res.status(200).send('App is running');
});

export default router;
