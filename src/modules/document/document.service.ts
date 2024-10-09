import Document from "../../models/document.model";

export class DocumentService {
  static async getAllDocuments() {
    return Document.findAll();
  }
}
