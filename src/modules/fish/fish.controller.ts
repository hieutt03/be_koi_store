import { NextFunction, Request, Response } from "express";

export const getAllFishes = (req: Request, res: Response, next: NextFunction) => {
  res.render("Fish");
};