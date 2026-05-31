import axios from "axios";

const API_URL =
  "https://supernova-production-ff0a.up.railway.app/api/pagos";

export const obtenerMetodosPago =
  async () => {

    const response =
      await axios.get(`${API_URL}/metodos`);

    return response.data;

};

export const crearPago =
  async (pago: any) => {

    const response =
      await axios.post(API_URL, pago);

    return response.data;

};

export const obtenerPagoPorPedido =
  async (idPedido: number) => {

    const response =
      await axios.get(
        `${API_URL}/pedido/${idPedido}`
      );

    return response.data;

};