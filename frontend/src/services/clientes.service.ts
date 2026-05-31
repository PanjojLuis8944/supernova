import axios from "axios";

const API_URL =
  "http://localhost:3000/api/clientes";

export const obtenerPerfilCliente =
  async (idUsuario: number) => {

    const response =
      await axios.get(
        `${API_URL}/usuario/${idUsuario}`
      );

    return response.data;

};

export const actualizarPerfilCliente =
  async (
    idCliente: number,
    cliente: any
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${idCliente}`,
        cliente
      );

    return response.data;

};