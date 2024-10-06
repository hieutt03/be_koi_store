import { Router } from 'express';
import userRoutes from './user.route';

const mainRoutes: Router = Router();

mainRoutes.use('/user', userRoutes);

export default mainRoutes;
