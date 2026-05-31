import { Request, Response } from "express";

import {
  obtenerClientePorUsuario,
  actualizarCliente
} from "../services/clientes.service";

export const obtenerPerfilCliente =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const { idUsuario } = req.params;

      const cliente =
        await obtenerClientePorUsuario(
          Number(idUsuario)
        );

      res.json(cliente);

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        mensaje:
          error.message ||
          "Error al obtener perfil"
      });

    }

};

export const actualizarPerfilCliente =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const { idCliente } = req.params;

      await actualizarCliente(
        Number(idCliente),
        req.body
      );

      res.json({
        mensaje:
          "Perfil actualizado correctamente"
      });

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        mensaje:
          error.message ||
          "Error al actualizar perfil"
      });

    }

};