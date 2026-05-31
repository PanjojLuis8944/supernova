import axios from "axios";

const API_URL =
  "http://localhost:3000/api/direcciones";

export const obtenerDireccionesCliente =
  async (idCliente: number) => {

    const response =
      await axios.get(
        `${API_URL}/cliente/${idCliente}`
      );

    return response.data;

};

export const crearDireccion =
  async (direccion: any) => {

    const response =
      await axios.post(
        API_URL,
        direccion
      );

    return response.data;

};