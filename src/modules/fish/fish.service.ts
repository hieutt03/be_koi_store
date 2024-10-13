import Fish, { FishCreationAttributes } from "../../models/fish.model";
import { Status } from "../../contants/enums";
import { PackageCreationAttributes } from "../../models/package.model";

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
  
  static async getFishByFishId(fishId: string): Promise<Fish | null> {
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
  
  static async deleteFish(fishId: string): Promise<boolean> {
    try {
      const [updateRows] = await Fish.update({
        status: Status.Inactive
      }, {
        where: {
          fishId: Number(fishId)
        }
      });
      return updateRows > 0;
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
  
  static async updateStatus(fishId: string, status: Status): Promise<boolean> {
    try {
      const [updateRows] = await Fish.update({
        status: status
      }, {
        where: {
          fishId: Number(fishId)
        }
      });
      return updateRows > 0;
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
  
  static async update(fishId: string, fishData: FishCreationAttributes): Promise<boolean> {
    try {
      const [updateRows] = await Fish.update(fishData, {
        where: {
          fishId: Number(fishId)
        }
      });
      return updateRows > 0;
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
 
}
