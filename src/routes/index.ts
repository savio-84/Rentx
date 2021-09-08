import { Router } from 'express';
const router = Router();

import { usersRouter } from './users.routes';
import { categoriesRouter } from './categories.routes';


router.use('/categories', categoriesRouter);
router.use('/users', usersRouter);

export { router };