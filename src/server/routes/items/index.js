import express from 'express';

import createItem from './createItem';
import deleteItem from './deleteItem';
import getItem from './getItem';
import getItemList from './getItemList';
import updateItem from './updateItem';

let router = new express.Router();

router.use(createItem);
router.use(deleteItem);
router.use(getItem);
router.use(getItemList);
router.use(updateItem);

export default router;
