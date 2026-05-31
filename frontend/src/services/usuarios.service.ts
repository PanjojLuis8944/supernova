import axios from "axios";

const API_URL =
  "http://localhost:3000/api/usuarios";

export const obtenerUsuarios =
  async () => {

    const response =
      await axios.get(API_URL);

    return response.data;

};

export const cambiarRolUsuario =
  async (
    idUsuario: number,
    idRol: number
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${idUsuario}/rol`,
        {
          id_rol: idRol
        }
      );

    return response.data;

};

export const eliminarUsuario =
  async (
    idUsuario: number
  ) => {

    const response =
      await axios.delete(
        `${API_URL}/${idUsuario}`
      );

    return response.data;

};