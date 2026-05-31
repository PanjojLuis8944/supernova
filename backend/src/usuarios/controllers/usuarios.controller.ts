import { Request, Response } from "express";

import {
  listarUsuarios,
  actualizarRolUsuario,
  eliminarUsuario,
  crearUsuario
} from "../services/usuarios.service";

export const obtenerUsuarios =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const usuarios =
        await listarUsuarios();

      res.json(usuarios);

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        mensaje:
          error.message ||
          "Error al obtener usuarios"
      });

    }

};

export const cambiarRol =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const { id } = req.params;

      const { id_rol } = req.body;

      await actualizarRolUsuario(
        Number(id),
        id_rol
      );

      res.json({
        mensaje:
          "Rol actualizado correctamente"
      });

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        mensaje:
          error.message ||
          "Error al actualizar rol"
      });

    }

};

export const eliminar =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const { id } = req.params;

      await eliminarUsuario(
        Number(id)
      );

      res.json({
        mensaje:
          "Usuario eliminado correctamente"
      });

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        mensaje:
          error.message ||
          "Error al eliminar usuario"
      });

    }

};
export const crearNuevoUsuario =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const resultado =
        await crearUsuario(req.body);

      res.status(201).json({
        mensaje:
          "Usuario creado correctamente",
        resultado
      });

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        mensaje:
          error.message ||
          "Error al crear usuario"
      });

    }

};