import Pool, { PoolCreationAttributes } from "../../models/pool.model";
import { PoolStatus } from "../../contants/enums";

export class PoolService {
  static async getAllPools(): Promise<Pool[]> {
    try {
      return Pool.findAll({
        order: [
          ["createdAt", "DESC"]
        ]
      });
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
  
  static async create(pool: PoolCreationAttributes): Promise<Pool> {
    try {
      return await Pool.create(pool);
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
  
  static async update(poolId: string, poolData: PoolCreationAttributes): Promise<boolean> {
    try {
      const [updateRows] = await Pool.update(poolData, {
        where: {
          poolId: Number(poolId)
        }
      });
      return updateRows > 0;
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
  
  static async getPoolById(poolId: string): Promise<Pool | null> {
    try {
      return await Pool.findByPk(Number(poolId));
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
  static async delete(poolId: string): Promise<boolean> {
    try {
      const [updateRows] = await Pool.update({
        status: PoolStatus.Inactive
      }, {
        where: {
          poolId: Number(poolId)
        }
      });
      return updateRows > 0;
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
}