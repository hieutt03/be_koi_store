import { Router } from 'express';
import userRoutes from './user.route';
import fishRoute from "./fish.route";

const mainRoutes: Router = Router();

mainRoutes.use('/user', userRoutes);
mainRoutes.use('/fishes', fishRoute);

export default mainRoutes;
