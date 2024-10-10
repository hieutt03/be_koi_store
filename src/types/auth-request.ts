import { Request } from "express";
import User from "../models/user.model";

// Custom Request type that includes 'user'
export interface AuthRequest extends Request {
  user?: User;
}
