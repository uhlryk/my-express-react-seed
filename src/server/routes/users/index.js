import express from 'express';

import createUser from './createUser';
import activateUser from './activateUser';
import resetPasswordConfirmation from './resetPasswordConfirmation';
import resetPassword from './resetPassword';

let router = new express.Router();

router.use(createUser);
router.use(activateUser);
router.use(resetPasswordConfirmation);
router.use(resetPassword);

export default router;
