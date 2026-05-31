import { Router } from "express";
import { obtenerMarcas } from "../controllers/marcas.controller";

const router = Router();

router.get("/", obtenerMarcas);

export default router;