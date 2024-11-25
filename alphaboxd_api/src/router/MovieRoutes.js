import { Router } from "express";
import MoviesController from "../controller/MoviesController.js";

const router = Router();

router.get("/movies", MoviesController.findAll);
router.post("/movies", MoviesController.save);


router.get("/movies/:id", MoviesController.findById);
router.put("/movies/:id", MoviesController.update);
router.delete("/movies/:id", MoviesController.deleteById);


export default router;