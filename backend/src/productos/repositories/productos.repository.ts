import pool from "../../common/persistence/db";

export const obtenerProductosDB = async () => {
  const [rows] = await pool.query(`
    SELECT
      p.id_producto,
      p.nombre_producto,
      p.descripcion,
      p.precio,
      p.stock,
      p.imagen,
      p.estado,
      c.nombre_categoria AS categoria,
      m.nombre_marca AS marca
    FROM productos p
    INNER JOIN categorias c
      ON p.id_categoria = c.id_categoria
    INNER JOIN marcas m
      ON p.id_marca = m.id_marca
    WHERE p.estado = TRUE
  `);

  return rows;
};

export const obtenerProductoPorIdDB = async (id: number) => {
  const [rows]: any = await pool.query(`
    SELECT
      p.id_producto,
      p.nombre_producto,
      p.descripcion,
      p.precio,
      p.stock,
      p.imagen,
      p.estado,
      c.nombre_categoria AS categoria,
      m.nombre_marca AS marca
    FROM productos p
    INNER JOIN categorias c
      ON p.id_categoria = c.id_categoria
    INNER JOIN marcas m
      ON p.id_marca = m.id_marca
    WHERE p.id_producto = ?
  `, [id]);

  return rows[0];
};
export const crearProductoDB = async (producto: any) => {

  const {
    id_categoria,
    id_marca,
    nombre_producto,
    descripcion,
    precio,
    stock,
    imagen
  } = producto;

  const [result]: any = await pool.query(`
    INSERT INTO productos (
      id_categoria,
      id_marca,
      nombre_producto,
      descripcion,
      precio,
      stock,
      imagen,
      estado
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)
  `, [
    id_categoria,
    id_marca,
    nombre_producto,
    descripcion,
    precio,
    stock,
    imagen
  ]);

  return result;

};

export const actualizarProductoDB = async (id: number, producto: any) => {
  const {
    id_categoria,
    id_marca,
    nombre_producto,
    descripcion,
    precio,
    stock,
    imagen
  } = producto;

  const [result]: any = await pool.query(`
    UPDATE productos
    SET
      id_categoria = ?,
      id_marca = ?,
      nombre_producto = ?,
      descripcion = ?,
      precio = ?,
      stock = ?,
      imagen = ?
    WHERE id_producto = ?
  `, [
    id_categoria,
    id_marca,
    nombre_producto,
    descripcion,
    precio,
    stock,
    imagen,
    id
  ]);

  return result;
};

export const eliminarProductoDB = async (id: number) => {

  const [result]: any = await pool.query(`
    UPDATE productos
    SET estado = FALSE
    WHERE id_producto = ?
  `, [id]);

  return result;

};