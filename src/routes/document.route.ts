import { Router } from "express";
import { getAllDocuments } from "../modules/document/document.controller";

const documentRoute: Router = Router();

documentRoute.get("/", getAllDocuments);

export default documentRoute;
