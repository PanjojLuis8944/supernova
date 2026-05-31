import { Request, Response } from "express";

import {
  listarMetodosPago, obtenerPagoPorPedido,
  crearPago
} from "../services/pagos.service";

export const obtenerMetodosPago =
  async (req: Request, res: Response) => {

    try {

      const metodos =
        await listarMetodosPago();

      res.json(metodos);

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        mensaje:
          error.message ||
          "Error al obtener métodos de pago"
      });

    }

};

export const crearNuevoPago =
  async (req: Request, res: Response) => {

    try {

      const resultado =
        await crearPago(req.body);

      res.status(201).json({
        mensaje:
          "Pago registrado correctamente",
        resultado
      });

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        mensaje:
          error.message ||
          "Error al registrar pago"
      });

    }

};

export const obtenerPagoPedido =
  async (req: Request, res: Response) => {

    try {

      const { idPedido } = req.params;

      const pago =
        await obtenerPagoPorPedido(Number(idPedido));

      res.json(pago);

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        mensaje:
          error.message ||
          "Error al obtener pago"
      });

    }

};