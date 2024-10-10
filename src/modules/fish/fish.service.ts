import Fish, { FishCreationAttributes } from "../../models/fish.model";

export class FishService {
  static async getAllFishes(): Promise<Fish[]> {
    try {
      return Fish.findAll({
        order: [
          ["createdAt", "DESC"]
        ]
      });
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
  
  static async getFishByUserId(fishId: String): Promise<Fish | null> {
    try {
      return Fish.findByPk(Number(fishId));
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
  
  static async createFish(fish: FishCreationAttributes): Promise<Fish> {
    try {
      return await Fish.create(fish);
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
}
