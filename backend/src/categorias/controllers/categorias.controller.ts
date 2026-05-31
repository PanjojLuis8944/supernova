import { Request, Response } from "express";

import {
  listarCategorias,
  listarCategoriaPorId,
  crearCategoria as crearCategoriaService,
  actualizarCategoria as actualizarCategoriaService,
  eliminarCategoria as eliminarCategoriaService
} from "../services/categorias.service";

export const obtenerCategorias = async (
  req: Request,
  res: Response
) => {
  try {
    const categorias = await listarCategorias();

    res.json(categorias);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al obtener categorías"
    });
  }
};

export const obtenerCategoriaPorId = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const categoria = await listarCategoriaPorId(id);

    if (!categoria) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada"
      });
    }

    res.json(categoria);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al obtener categoría"
    });
  }
};

export const crearNuevaCategoria = async (
  req: Request,
  res: Response
) => {
  try {
    const categoria = req.body;

    const resultado = await crearCategoriaService(categoria);

    res.status(201).json({
      mensaje: "Categoría creada correctamente",
      resultado
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al crear categoría"
    });
  }
};

export const actualizarCategoria = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const categoria = req.body;

    const resultado = await actualizarCategoriaService(id, categoria);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada"
      });
    }

    res.json({
      mensaje: "Categoría actualizada correctamente"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al actualizar categoría"
    });
  }
};

export const eliminarCategoria = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const resultado = await eliminarCategoriaService(id);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada"
      });
    }

    res.json({
      mensaje: "Categoría eliminada correctamente"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al eliminar categoría"
    });
  }
};