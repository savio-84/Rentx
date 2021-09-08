import { Router } from 'express';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();

categoriesRouter.post('/', createCategoryController.handle);

export { categoriesRouter };