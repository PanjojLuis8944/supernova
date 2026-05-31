import pool from "../../common/persistence/db";

export const obtenerMetodosPagoDB =
  async () => {

    const [rows] = await pool.query(`
      SELECT
        id_metodo_pago,
        nombre_metodo
      FROM metodos_pago
      ORDER BY id_metodo_pago
    `);

    return rows;

};

export const crearPagoDB =
  async (pago: any) => {

    const [result]: any = await pool.query(`
      INSERT INTO pagos
      (
        id_pedido,
        id_metodo_pago,
        monto,
        estado_pago,
        nit_factura
      )
      VALUES (?, ?, ?, ?, ?)
    `, [
        pago.id_pedido,
        pago.id_metodo_pago,
        pago.monto,
        pago.estado_pago || "Pagado",
        pago.nit_factura
    ]);

    return result;

};

export const obtenerPagoPorPedidoDB =
  async (idPedido: number) => {

    const [rows] = await pool.query(`
      SELECT
        pg.id_pago,
        pg.id_pedido,
        pg.id_metodo_pago,
        mp.nombre_metodo,
        pg.monto,
        pg.fecha_pago,
        pg.estado_pago,
        pg.nit_factura
      FROM pagos pg
      INNER JOIN metodos_pago mp
        ON pg.id_metodo_pago = mp.id_metodo_pago
      WHERE pg.id_pedido = ?
      LIMIT 1
    `, [idPedido]);

    return (rows as any[])[0];

};