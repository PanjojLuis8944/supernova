import axios from "axios";

const API_URL =
  "http://localhost:3000/api/dashboard";

export const obtenerResumenDashboard =
  async () => {

    const response =
      await axios.get(`${API_URL}/resumen`);

    return response.data;

};