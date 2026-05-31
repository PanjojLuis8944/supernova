import { Router } from "express";

import { obtenerProductos,obtenerProductoPorId, crearNuevoProducto, actualizarProducto, eliminarProducto } from "../controllers/productos.controller";


const router = Router();

router.get("/", obtenerProductos);

router.get("/:id", obtenerProductoPorId);

router.post("/", crearNuevoProducto);

router.put("/:id", actualizarProducto);

router.delete("/:id", eliminarProducto);

export default router;
