import { obtenerMarcasDB } from "../repositories/marcas.repository";

export const listarMarcas = async () => {
  return await obtenerMarcasDB();
};