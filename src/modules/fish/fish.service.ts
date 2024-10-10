import Fish from "../../models/fish.model";

export class FishService {
  static async getAllFishes(): Promise<Fish[]> {
    try {
      return Fish.findAll({
        order: [
          ["createdAt", "DESC"]
        ]
      });
    } catch (e) {
      throw "Something went wrong.";
    }
  }
  
  static async getFishByUserId(fishId: String): Promise<Fish | null> {
    try {
      return Fish.findByPk(Number(fishId));
    } catch (e) {
      throw "Something went wrong.";
    }
  }
  
  // static async createFish(fish: Fish): Promise<Fish> {
  //   try {
  //
  //   } catch (e) {
  //     throw "Something went wrong.";
  //   }
  // }
}
