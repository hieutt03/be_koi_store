import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const ok = (res: Response, message: string = "", data: unknown = undefined) => {
  return res.status(StatusCodes.OK).json({ message, data });
};

export const created = (res: Response, message: string = "", data: unknown = undefined) => {
  return res.status(StatusCodes.CREATED).json(data);
};

export const noContent = (res: Response, message: string = "") => {
  return res.status(StatusCodes.NO_CONTENT).json({ message });
};

export const badRequest = (res: Response, message: string = "", data?: unknown) => {
  return res.status(StatusCodes.BAD_REQUEST).json({ message, data });
};

export const notFound = (res: Response, message: string = "") => {
  return res.status(StatusCodes.NOT_FOUND).json({ message });
};

export const forbidden = (res: Response, message: string = "") => {
  return res.status(StatusCodes.FORBIDDEN).json({ message });
};

export const unauthorized = (res: Response, message: string = "") => {
  return res.status(StatusCodes.UNAUTHORIZED).json({ message });
};

export const internalServerError = (res: Response, message: string = "") => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};
