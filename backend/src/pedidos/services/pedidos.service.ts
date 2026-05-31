import { crearPedidoDB, obtenerPedidosDB, obtenerDetallePedidoDB, actualizarEstadoPedidoDB } from "../repositories/pedidos.repository";

export const listarPedidos = async () => {
  return await obtenerPedidosDB();
};

export const crearPedido = async (pedido: any) => {
  const { detalles, ...datosPedido } = pedido;

  if (!detalles || detalles.length === 0) {
    throw new Error("El pedido debe tener productos");
  }

  return await crearPedidoDB(datosPedido, detalles);
};

export const listarDetallePedido = async (
  idPedido: number
) => {

  return await obtenerDetallePedidoDB(idPedido);

};

export const cambiarEstadoPedido = async (
  idPedido: number,
  idEstadoPedido: number
) => {

  return await actualizarEstadoPedidoDB(
    idPedido,
    idEstadoPedido
  );

};