import pool from "../../common/persistence/db";

export const obtenerDireccionesPorClienteDB =
  async (idCliente: number) => {

    const [rows] = await pool.query(`
      SELECT
        id_direccion,
        id_cliente,
        direccion,
        municipio,
        departamento,
        referencia
      FROM direcciones
      WHERE id_cliente = ?
      ORDER BY id_direccion DESC
    `, [idCliente]);

    return rows;

};

export const crearDireccionDB =
  async (direccion: any) => {

    const [result]: any = await pool.query(`
      INSERT INTO direcciones
      (
        id_cliente,
        direccion,
        municipio,
        departamento,
        referencia
      )
      VALUES (?, ?, ?, ?, ?)
    `, [
      direccion.id_cliente,
      direccion.direccion,
      direccion.municipio,
      direccion.departamento,
      direccion.referencia
    ]);

    return result;

};