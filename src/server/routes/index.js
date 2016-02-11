import express from 'express';

import items from './items';
import users from './users';

let router = new express.Router();

router.use(items);
router.use(users);

router.get('/', (req, res) => {
  res.status(200).send('App is running');
});

export default router;
