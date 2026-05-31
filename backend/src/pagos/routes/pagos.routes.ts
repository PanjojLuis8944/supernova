import { Router } from "express";

import {
  obtenerMetodosPago, obtenerPagoPedido,
  crearNuevoPago
} from "../controllers/pagos.controller";

const router = Router();

router.get("/metodos", obtenerMetodosPago);

router.post("/", crearNuevoPago);

router.get("/pedido/:idPedido", obtenerPagoPedido);

export default router;