import Fee, {FeeCreationAttributes} from "../../models/fee.model";

export class FeeService {
    static async create(data: FeeCreationAttributes) {
        try {
            return await Fee.create(data)
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }
    }
}