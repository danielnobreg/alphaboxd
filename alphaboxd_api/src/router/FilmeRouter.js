import { Router } from "express";
import FilmeController from "../controller/FilmeController.js";

const router = Router(); 

router.get("/movies", FilmeController.findAll);
router.get("/movies/:id", FilmeController.findById);
router.post("/movies", FilmeController.save);
router.put("/movies/:id", FilmeController.update);
router.delete("/movies/:id", FilmeController.deleteById);

export default router;