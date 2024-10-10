import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model";
import BadRequestException from "../../helpers/errors/bad-request.exception";
import { Role } from "../../contants/enums";
import bcrypt from "bcryptjs";
import { AuthRequest } from "../../types/auth-request";

export class UserService {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const newUser = await User.findAll({
      order: [["createdAt", "ASC"]],
    });
    return newUser;
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const existingUser = await User.findOne({ where: { userId } });
    if (!existingUser) {
      throw new BadRequestException("User not found");
    }

    return existingUser;
  }

  static async registerStaff(req: Request) {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException("Staff already exists");
    }
    const newUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      active: true,
      role: Role.Staff,
      gender: true,
      address: "",
    });
    return newUser;
  }

  static async getAllStaffs() {
    const allStaffs = await User.findAll({
      where: { role: Role.Staff },
    });

    return allStaffs;
  }

  static async getStaffById(req: AuthRequest) {
    const staff = await User.findOne({ where: { userId: req?.user?.userId, role: Role.Staff } });
    if (!staff) {
      throw new BadRequestException("Staff not found");
    }

    return staff;
  }
}
