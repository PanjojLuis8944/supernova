import {
  obtenerProductosDB,
  obtenerProductoPorIdDB
} from "../repositories/productos.repository";
import { crearProductoDB } from "../repositories/productos.repository";
import { actualizarProductoDB } from "../repositories/productos.repository";
import { eliminarProductoDB } from "../repositories/productos.repository";

export const listarProductos = async () => {
  const productos = await obtenerProductosDB();

  return productos;
};

export const listarProductoPorId = async (id: number) => {
  const producto = await obtenerProductoPorIdDB(id);

  return producto;
};

export const crearProducto = async (producto: any) => {

  const resultado = await crearProductoDB(producto);

  return resultado;

};

export const actualizarProducto = async (id: number, producto: any) => {
  const resultado = await actualizarProductoDB(id, producto);

  return resultado;
};

export const eliminarProducto = async (id: number) => {

  const resultado = await eliminarProductoDB(id);

  return resultado;

};