import { Request, Response } from "express";
import { listarProductos, listarProductoPorId } from "../services/productos.service";
import { crearProducto as crearProductoService } from "../services/productos.service";
import { actualizarProducto as actualizarProductoService } from "../services/productos.service";
import { eliminarProducto as eliminarProductoService } from "../services/productos.service";

export const obtenerProductos = async (
  req: Request,
  res: Response
) => {

  try {

    const productos = await listarProductos();

    res.json(productos);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error al obtener productos"
    });

  }

};

export const obtenerProductoPorId = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const producto = await listarProductoPorId(id);

    if (!producto) {

      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });

    }

    res.json(producto);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error al obtener producto"
    });

  }

};

export const crearNuevoProducto = async (
  req: Request,
  res: Response
) => {

  try {

    const producto = req.body;

    const resultado = await crearProductoService(producto);

    res.status(201).json({
      mensaje: "Producto creado correctamente",
      resultado
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error al crear producto"
    });

  }

};

export const actualizarProducto = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const producto = req.body;

    const resultado = await actualizarProductoService(id, producto);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.json({
      mensaje: "Producto actualizado correctamente"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al actualizar producto"
    });
  }
};

export const eliminarProducto = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const resultado = await eliminarProductoService(id);

    if (resultado.affectedRows === 0) {

      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });

    }

    res.json({
      mensaje: "Producto eliminado correctamente"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error al eliminar producto"
    });

  }

};