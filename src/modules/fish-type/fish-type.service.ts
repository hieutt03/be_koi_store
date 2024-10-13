import FishType from "../../models/fishType.model";

export class FishTypeService {
  static async create(typeName: string): Promise<FishType> {
    try {
      return await FishType.create({ fishTypeName: typeName });
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
  
  static async getAll(): Promise<FishType[]> {
    try {
      return await FishType.findAll({
        order: [
          ["createdAt", "DESC"]
        ]
      });
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
    
  }
}