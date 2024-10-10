import Pool from "../../models/pool.model";

export class PoolService {
  static async getAllPools(): Promise<Pool[]> {
    try {
      return Pool.findAll({
        order: [
          ["createdAt", "DESC"]
        ]
      });
    } catch (e) {
      throw "Something went wrong.";
    }
  }
  static async createPool(pool: Pool): Promise<Pool> {
    try {
      return await Pool.create(pool);
    } catch (e) {
      throw "Something went wrong.";
    }
  }
}