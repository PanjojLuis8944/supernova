import {
  obtenerUsuariosDB,
  cambiarRolUsuarioDB,
  eliminarUsuarioDB,
  crearUsuarioDB
} from "../repositories/usuarios.repository";

export const listarUsuarios =
  async () => {

    return await obtenerUsuariosDB();

};

export const actualizarRolUsuario =
  async (
    idUsuario: number,
    idRol: number
  ) => {

    return await cambiarRolUsuarioDB(
      idUsuario,
      idRol
    );

};

export const eliminarUsuario =
  async (
    idUsuario: number
  ) => {

    return await eliminarUsuarioDB(
      idUsuario
    );

};
export const crearUsuario =
  async (usuario: any) => {

    return await crearUsuarioDB(
      usuario
    );

};