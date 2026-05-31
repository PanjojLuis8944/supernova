import { Request, Response } from "express";

import {
  obtenerResumenDashboard
} from "../services/dashboard.service";

export const obtenerResumen =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const resumen =
        await obtenerResumenDashboard();

      res.json(resumen);

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        mensaje:
          error.message ||
          "Error dashboard"
      });

    }

};