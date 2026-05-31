import { Router } from "express";
import { crearNuevoPedido, obtenerPedidos, obtenerDetallePedido, actualizarEstadoPedido } from "../controllers/pedidos.controller";

const router = Router();

router.post("/", crearNuevoPedido);
router.get("/", obtenerPedidos);
router.get("/:id/detalle", obtenerDetallePedido);
router.put("/:id/estado", actualizarEstadoPedido);

export default router;