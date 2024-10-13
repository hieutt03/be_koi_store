import FishType from "../../models/type-fish.model";

export class FishTypeService {
  static async create(typeFishName: string): Promise<FishType> {
    try {
      return await FishType.create({ typeFishName });
    } catch (e) {
      throw "Something went wrong";
 
    }
  }

  static async getAll(): Promise<FishType[]> {
    try {
      return await FishType.findAll({
        order: [["createdAt", "DESC"]],
      });
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
}
