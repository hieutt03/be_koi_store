import { NextFunction, Request, Response } from "express";
import ResponseDTO from "../../helpers/response";
import { DocumentService } from "./document.service";

export const getAllDocuments = async (req: Request, res: Response, next: NextFunction) => {
  const allDocuments = await DocumentService.getAllDocuments();
  res.status(200).json(ResponseDTO("Get all documents", allDocuments));
};
