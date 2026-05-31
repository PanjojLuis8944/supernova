import {
  obtenerCategoriasDB,
  obtenerCategoriaPorIdDB,
  crearCategoriaDB,
  actualizarCategoriaDB,
  eliminarCategoriaDB
} from "../repositories/categorias.repository";

export const listarCategorias = async () => {
  return await obtenerCategoriasDB();
};

export const listarCategoriaPorId = async (id: number) => {
  return await obtenerCategoriaPorIdDB(id);
};

export const crearCategoria = async (categoria: any) => {
  return await crearCategoriaDB(categoria);
};

export const actualizarCategoria = async (id: number, categoria: any) => {
  return await actualizarCategoriaDB(id, categoria);
};

export const eliminarCategoria = async (id: number) => {
  return await eliminarCategoriaDB(id);
};