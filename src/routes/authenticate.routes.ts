import { Router } from 'express';
import { AuthenticateController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateController();

authenticateRouter.post('/', authenticateUserController.handle);

export { authenticateRouter };