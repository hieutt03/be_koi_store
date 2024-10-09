import Voucher from "../../models/voucher.model";

export class VoucherService {
  static async getAllVouchers() {
    return Voucher.findAll();
  }
}
