import express from 'express';
import httpStatus from 'http-status-codes';
import items from '../items';
import checkAuthentication from '../../middlewares/checkAuthentication';

let router = new express.Router();

router.use('/accounts/', checkAuthentication());

router.use('/accounts', items);

router.get('/accounts', (req, res) => {
  res.status(httpStatus.OK).send('App is running');
});

export default router;
