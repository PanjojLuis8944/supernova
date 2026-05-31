import axios from "axios";

const API_URL =
  "https://supernova-production-ff0a.up.railway.app/api/categorias";

export const obtenerCategorias =
  async () => {

    const response =
      await axios.get(API_URL);

    return response.data;

};