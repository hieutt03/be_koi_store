import { Request } from "express";
import User from "../../models/user.model";
import BadRequestException from "../../helpers/errors/bad-request.exception";
import { Role } from "../../contants/enums";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

export class AuthService {
  static async registerUser(req: Request) {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException("User already exists");
    }
    const newUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      active: true,
      role: Role.Customer,
      gender: true,
      address: "",
    });
    return newUser;
  }

  static generateToken(user: User) {
    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    return token;
  }

  static async loginUser(req: Request) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid email or password");
    }

    const token = this.generateToken(user);

    return { user, token };
  }

  static getCurrentUser = async (req: Request) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new BadRequestException("Invalid token");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findOne({ where: { userId: decoded.id } });
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return user;
  };
}
