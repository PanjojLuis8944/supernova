import { Router } from "express";

import {
  obtenerUsuarios,
  cambiarRol,
  eliminar,
  crearNuevoUsuario
} from "../controllers/usuarios.controller";

const router = Router();

router.get("/", obtenerUsuarios);

router.put("/:id/rol", cambiarRol);

router.delete("/:id", eliminar);

router.post("/", crearNuevoUsuario);

export default router;