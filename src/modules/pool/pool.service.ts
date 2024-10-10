import Pool, { PoolCreationAttributes } from "../../models/pool.model";

export class PoolService {
  static async getAllPools(): Promise<Pool[]> {
    try {
      return Pool.findAll({
        order: [
          ["createdAt", "DESC"]
        ]
      });
    } catch (e:any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
  
  static async create(pool: PoolCreationAttributes): Promise<Pool> {
    try {
      return await Pool.create(pool);
    } catch (e:any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
}