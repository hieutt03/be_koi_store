import { Request } from "express";
import User from "../../models/user.model";
import BadRequestException from "../../helpers/errors/bad-request.exception";

export class AuthService {
  static async registerUser(req: Request) {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    console.log("🚀 ~ AuthService ~ registerUser ~ existingUser:", existingUser);

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }
  }
}
