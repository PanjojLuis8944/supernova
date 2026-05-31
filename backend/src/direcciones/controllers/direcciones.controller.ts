import { Request, Response } from "express";

import {
  listarDireccionesPorCliente,
  crearDireccion
} from "../services/direcciones.service";

export const obtenerDireccionesPorCliente =
  async (req: Request, res: Response) => {

    try {

      const { idCliente } = req.params;

      const direcciones =
        await listarDireccionesPorCliente(
          Number(idCliente)
        );

      res.json(direcciones);

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        mensaje:
          error.message ||
          "Error al obtener direcciones"
      });

    }

};

export const crearNuevaDireccion =
  async (req: Request, res: Response) => {

    try {

      const resultado =
        await crearDireccion(req.body);

      res.status(201).json({
        mensaje:
          "Dirección creada correctamente",
        resultado
      });

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        mensaje:
          error.message ||
          "Error al crear dirección"
      });

    }

};