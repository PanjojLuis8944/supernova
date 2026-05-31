import pool from "../../common/persistence/db";

export const obtenerMarcasDB = async () => {

  const [rows] = await pool.query(`
    SELECT
      id_marca,
      nombre_marca,
      estado
    FROM marcas
    WHERE estado = TRUE
  `);

  return rows;

};