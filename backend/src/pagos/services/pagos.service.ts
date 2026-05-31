import {
  obtenerMetodosPagoDB, obtenerPagoPorPedidoDB,
  crearPagoDB
} from "../repositories/pagos.repository";

export const listarMetodosPago =
  async () => {

    return await obtenerMetodosPagoDB();

};

export const crearPago =
  async (pago: any) => {

    return await crearPagoDB(pago);

};

export const obtenerPagoPorPedido =
  async (idPedido: number) => {

    return await obtenerPagoPorPedidoDB(idPedido);

};