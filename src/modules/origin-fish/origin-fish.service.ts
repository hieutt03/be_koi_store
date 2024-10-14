import OriginFish from "../../models/origin-fish.model";


export class OriginFishService {
    static async create(originFishName: string): Promise<OriginFish> {
        try {
            return await OriginFish.create({ originFishName });
        } catch (e) {
            throw "Something went wrong";

        }
    }

    static async getAll(): Promise<OriginFish[]> {
        try {
            return await OriginFish.findAll({
                order: [["createdAt", "DESC"]],
            });
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }
    }
}
