import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../helpers/errors/api-error";

const errorHandlingMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error("Error caught by middleware:", err);

  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandlingMiddleware;
