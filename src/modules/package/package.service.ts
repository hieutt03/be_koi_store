import Package, {PackageCreationAttributes} from "../../models/package.model";
import {Transaction} from "sequelize";

export class PackageService {
    static async getAllPackages(): Promise<Package[]> {
        try {
            return await Package.findAll({
                order: [
                    ["createdAt", "DESC"]
                ]
            });
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }
    }

    static async getPackageByPackageId(packageId: number): Promise<Package | null> {
        try {
            return await Package.findByPk(Number(packageId));
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }
    }

    static async create(packageData: PackageCreationAttributes, transaction?: Transaction): Promise<Package> {
        try {
            return await Package.create(packageData, {transaction});
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }
    }

    static async update(packageId: number, packageData: PackageCreationAttributes): Promise<boolean> {
        try {
            const [updateRows] =
                await Package.update(packageData, {
                    where: {
                        packageId: Number(packageId)
                    }
                });
            return updateRows > 0;
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }
    }

}
