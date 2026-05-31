import pool from "../../common/persistence/db";

export const obtenerClientePorUsuarioDB =
  async (idUsuario: number) => {

    const [rows]: any = await pool.query(`
      SELECT
        id_cliente,
        id_usuario,
        telefono,
        nombres,
        apellidos,
        dpi,
        nit,
        fecha_nacimiento
      FROM clientes
      WHERE id_usuario = ?
      LIMIT 1
    `, [idUsuario]);

    return rows[0];

};

export const actualizarClienteDB =
  async (
    idCliente: number,
    cliente: any
  ) => {

    const [result]: any = await pool.query(`
      UPDATE clientes
      SET
        telefono = ?,
        nombres = ?,
        apellidos = ?,
        dpi = ?,
        nit = ?,
        fecha_nacimiento = ?
      WHERE id_cliente = ?
    `, [
      cliente.telefono,
      cliente.nombres,
      cliente.apellidos,
      cliente.dpi,
      cliente.nit,
      cliente.fecha_nacimiento,
      idCliente
    ]);

    return result;

};