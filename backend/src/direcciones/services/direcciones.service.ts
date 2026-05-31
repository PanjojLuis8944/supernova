import {
  obtenerDireccionesPorClienteDB,
  crearDireccionDB
} from "../repositories/direcciones.repository";

export const listarDireccionesPorCliente =
  async (idCliente: number) => {

    return await obtenerDireccionesPorClienteDB(idCliente);

};

export const crearDireccion =
  async (direccion: any) => {

    return await crearDireccionDB(direccion);

};