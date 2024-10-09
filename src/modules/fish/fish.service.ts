import Fish from "../../models/fish.model";

export class FishService {
  static async getAllFishes() {
    return Fish.findAll();
  }
}
