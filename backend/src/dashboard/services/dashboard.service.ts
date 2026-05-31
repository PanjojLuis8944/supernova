import {
  obtenerResumenDashboardDB
} from "../repositories/dashboard.repository";

export const obtenerResumenDashboard =
  async () => {

    return await obtenerResumenDashboardDB();

};