import { Router } from "express";

import {
  obtenerDireccionesPorCliente,
  crearNuevaDireccion
} from "../controllers/direcciones.controller";

const router = Router();

router.get("/cliente/:idCliente", obtenerDireccionesPorCliente);

router.post("/", crearNuevaDireccion);

export default router;