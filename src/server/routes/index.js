import express from 'express';

import items from './items';
import users from './users/index';
import authentications from './authentications';
import accounts from './accounts/index';

let router = new express.Router();

router.use(items);
router.use(users);
router.use(authentications);
router.use(accounts);

router.get('/', (req, res) => {
  res.status(200).send('App is running');
});

export default router;
