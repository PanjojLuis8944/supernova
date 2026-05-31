import axios from "axios";

const API_URL =
  "https://supernova-production-ff0a.up.railway.app/api/dashboard";

export const obtenerResumenDashboard =
  async () => {

    const response =
      await axios.get(`${API_URL}/resumen`);

    return response.data;

};