import axios from "axios";

const API_URL = "https://supernova-production-ff0a.up.railway.app/api/pedidos";

export const crearPedido = async (
  pedido: any
) => {
  const response = await axios.post(
    API_URL,
    pedido
  );

  return response.data;
};

export const obtenerPedidos = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const obtenerDetallePedido = async (
  idPedido: number
) => {
  const response = await axios.get(
    `${API_URL}/${idPedido}/detalle`
  );

  return response.data;
};

export const actualizarEstadoPedido = async (
  idPedido: number,
  idEstadoPedido: number
) => {
  const response = await axios.put(
    `${API_URL}/${idPedido}/estado`,
    {
      id_estado_pedido: idEstadoPedido
    }
  );

  return response.data;
};