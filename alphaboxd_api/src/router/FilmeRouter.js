import { Router } from "express";
import FilmeController from "../controller/FilmeController.js";

const router = Router(); 

router.get("/filmes", FilmeController.findAll);
router.get("/filmes/:id", FilmeController.findById);
router.post("/filmes", FilmeController.save);
router.put("/filmes/:id", FilmeController.update);
router.delete("/filmes/:id", FilmeController.deleteById);

export default router;

