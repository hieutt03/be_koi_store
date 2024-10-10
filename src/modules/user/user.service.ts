import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model";

export class UserService {
  static async createUser(req: Request, res: Response, next: NextFunction): Promise<User | undefined> {
    try {
      const { name, email, password } = req.body;
      console.log({ name, email, password });
      const newUser = await User.create(req.body);
      return newUser;
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<User[] | undefined> {
    try {
      const newUser = await User.findAll({
        order: [["createdAt", "ASC"]],
      });
      return newUser;
    } catch (error) {
      next(error);
      return undefined;
    }
  }
}
