import { Request, Response } from "express";
import { listarMarcas } from "../services/marcas.service";

export const obtenerMarcas = async (
  req: Request,
  res: Response
) => {
  try {
    const marcas = await listarMarcas();

    res.json(marcas);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al obtener marcas"
    });
  }
};