import { Request, Response } from "express";
import { crearPedido, listarPedidos, listarDetallePedido, cambiarEstadoPedido } from "../services/pedidos.service";

export const obtenerPedidos = async (
  req: Request,
  res: Response
) => {
  try {
    const pedidos = await listarPedidos();

    res.json(pedidos);
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      mensaje: error.message || "Error al obtener pedidos"
    });
  }
};

export const crearNuevoPedido = async (
  req: Request,
  res: Response
) => {
  try {
    const resultado = await crearPedido(req.body);

    res.status(201).json({
      mensaje: "Pedido creado correctamente",
      resultado
    });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      mensaje: error.message || "Error al crear pedido"
    });
  }
};

export const obtenerDetallePedido = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params;

    const detalle = await listarDetallePedido(
      Number(id)
    );

    res.json(detalle);

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      mensaje:
        error.message ||
        "Error al obtener detalle"
    });

  }

};

export const actualizarEstadoPedido = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params;

    const { id_estado_pedido } = req.body;

    await cambiarEstadoPedido(
      Number(id),
      id_estado_pedido
    );

    res.json({
      mensaje:
        "Estado actualizado correctamente"
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      mensaje:
        error.message ||
        "Error al actualizar estado"
    });

  }

};