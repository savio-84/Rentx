import { Router } from 'express';
const router = Router();

import { usersRouter } from './users.routes';
import { categoriesRouter } from './categories.routes';
import { authenticateRouter } from './authenticate.routes';


router.use('/categories', categoriesRouter);
router.use('/users', usersRouter);
router.use('/sessions', authenticateRouter);

export { router };