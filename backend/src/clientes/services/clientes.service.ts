import {
  obtenerClientePorUsuarioDB,
  actualizarClienteDB
} from "../repositories/clientes.repository";

export const obtenerClientePorUsuario =
  async (idUsuario: number) => {

    return await obtenerClientePorUsuarioDB(
      idUsuario
    );

};

export const actualizarCliente =
  async (
    idCliente: number,
    cliente: any
  ) => {

    return await actualizarClienteDB(
      idCliente,
      cliente
    );

};