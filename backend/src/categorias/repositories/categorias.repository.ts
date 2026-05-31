import pool from "../../common/persistence/db";

export const obtenerCategoriasDB = async () => {
  const [rows] = await pool.query(`
    SELECT
      id_categoria,
      nombre_categoria,
      descripcion,
      estado
    FROM categorias
    WHERE estado = TRUE
  `);

  return rows;
};

export const obtenerCategoriaPorIdDB = async (id: number) => {
  const [rows]: any = await pool.query(`
    SELECT
      id_categoria,
      nombre_categoria,
      descripcion,
      estado
    FROM categorias
    WHERE id_categoria = ?
  `, [id]);

  return rows[0];
};

export const crearCategoriaDB = async (categoria: any) => {
  const { nombre_categoria, descripcion } = categoria;

  const [result]: any = await pool.query(`
    INSERT INTO categorias (
      nombre_categoria,
      descripcion,
      estado
    )
    VALUES (?, ?, TRUE)
  `, [
    nombre_categoria,
    descripcion
  ]);

  return result;
};

export const actualizarCategoriaDB = async (id: number, categoria: any) => {
  const { nombre_categoria, descripcion } = categoria;

  const [result]: any = await pool.query(`
    UPDATE categorias
    SET
      nombre_categoria = ?,
      descripcion = ?
    WHERE id_categoria = ?
  `, [
    nombre_categoria,
    descripcion,
    id
  ]);

  return result;
};

export const eliminarCategoriaDB = async (id: number) => {
  const [result]: any = await pool.query(`
    UPDATE categorias
    SET estado = FALSE
    WHERE id_categoria = ?
  `, [id]);

  return result;
};