import { Router } from "express";

import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearNuevaCategoria,
  actualizarCategoria,
  eliminarCategoria
} from "../controllers/categorias.controller";

const router = Router();

router.get("/", obtenerCategorias);

router.get("/:id", obtenerCategoriaPorId);

router.post("/", crearNuevaCategoria);

router.put("/:id", actualizarCategoria);

router.delete("/:id", eliminarCategoria);

export default router;