import { NextFunction, Request, Response } from "express";
import ResponseDTO from "../../helpers/response";
import { VoucherService } from "./voucher.service";

export const getAllVouchers = async (req: Request, res: Response, next: NextFunction) => {
  const allVouchers = await VoucherService.getAllVouchers();
  res.status(200).json(ResponseDTO("Get all Vouchers", allVouchers));
};
