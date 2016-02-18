import express from 'express';

import createUser from './createUser';
import activateUser from './activateUser';

let router = new express.Router();

router.use(createUser);
router.use(activateUser);

export default router;
