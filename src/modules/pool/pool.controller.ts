import { NextFunction, Request, Response } from "express";
import ResponseDTO from "../../helpers/response";

export const createPool =  async (req: Request, res: Response, next: NextFunction) =>{
  const {} = req.body;
  
  
  res.status(201).json(ResponseDTO("Create success!"))
}