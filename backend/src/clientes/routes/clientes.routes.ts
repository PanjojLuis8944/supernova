import { Router } from "express";

import {
  obtenerPerfilCliente,
  actualizarPerfilCliente
} from "../controllers/clientes.controller";

const router = Router();

router.get(
  "/usuario/:idUsuario",
  obtenerPerfilCliente
);

router.put(
  "/:idCliente",
  actualizarPerfilCliente
);

export default router;