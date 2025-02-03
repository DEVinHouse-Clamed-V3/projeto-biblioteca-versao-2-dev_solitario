import { Router } from "express";
import LeitorController from "../controllers/LeitorController";

const leitorRoutes = Router();

const leitorController = new LeitorController();

leitorRoutes.post("/", leitorController.create);
leitorRoutes.get("/", leitorController.getAll);
leitorRoutes.get("/aniversariantes", leitorController.getAniversariante);
leitorRoutes.get("/:id", leitorController.getOne);
leitorRoutes.put("/:id", leitorController.upDate);
leitorRoutes.delete("/:id", leitorController.delete);

export default leitorRoutes;
