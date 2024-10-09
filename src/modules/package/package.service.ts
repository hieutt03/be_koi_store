import Package from "../../models/package.model";

export class PackageService {
  static async getAllPackages() {
    return Package.findAll();
  }
}
