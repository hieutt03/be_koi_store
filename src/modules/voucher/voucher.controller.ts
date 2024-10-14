import {NextFunction, Request, Response} from "express";
import ResponseDTO from "../../helpers/response";
import {VoucherService} from "./voucher.service";
import {badRequest, created, internalServerError} from "../../utils/util";
import Voucher, {VoucherCreationAttributes} from "../../models/voucher.model";

export const getAllVouchers = async (req: Request, res: Response, next: NextFunction) => {
    const allVouchers = await VoucherService.getAllVouchers();
    res.status(200).json(ResponseDTO("Get all Vouchers", allVouchers));
};

export const checkVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const voucher = await VoucherService.getVoucherByCode(req.params.code);
    } catch (e) {
        next(e)
    }
}

export const createVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body as VoucherCreationAttributes
        if (!data.endDate || !data.startDate || !data.rate || !data.description || !data.name || !data.initQuantity ) {
            badRequest(res, "Please enter full information")
            return
        }
        console.log(data)

        const voucher = await VoucherService.create({...data, remainQuantity: data.initQuantity})

        if (!voucher) {
            internalServerError(res, "Create voucher failed")
            return
        }
        created(res, "Created Ok", voucher)
    } catch (e) {
        next(e)
    }
}