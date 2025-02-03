import { Router, Request, Response } from "express";
import AutorController from "../controllers/AutorController";

const autorRoutes = Router();
const autorController = new AutorController();

autorRoutes.post("/", autorController.create);
autorRoutes.get("/", autorController.getAll);
autorRoutes.get("/:id", autorController.getOne);
autorRoutes.get("/birthday", autorController.getAuthorsBirthday);
autorRoutes.put("/:id", autorController.update);
autorRoutes.delete("/:id", autorController.delete);

export default autorRoutes;
