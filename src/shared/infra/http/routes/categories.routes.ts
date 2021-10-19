import { Router } from 'express';

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();

categoriesRouter.post('/', ensureAuthenticated, createCategoryController.handle);

export { categoriesRouter };