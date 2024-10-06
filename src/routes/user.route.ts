import { Router } from 'express';
import { createUser } from '../modules/user/user.controller';

const userRoutes: Router = Router();

userRoutes.post('/', createUser);

export default userRoutes;
