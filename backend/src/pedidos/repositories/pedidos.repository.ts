import pool from "../../common/persistence/db";

export const crearPedidoDB = async (
  pedido: any,
  detalles: any[]
) => {

  const connection = await pool.getConnection();

  try {

    await connection.beginTransaction();

    const [pedidoResult]: any = await connection.query(
      `
      INSERT INTO pedidos
      (
        id_cliente,
        id_estado_pedido,
        id_direccion,
        total
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        pedido.id_cliente,
        1,
        pedido.id_direccion,
        pedido.total
      ]
    );

    const idPedido = pedidoResult.insertId;

    for (const detalle of detalles) {

      await connection.query(
        `
        INSERT INTO detalle_pedido
        (
          id_pedido,
          id_producto,
          cantidad,
          precio_unitario,
          subtotal
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
  idPedido,
  detalle.id_producto,
  detalle.cantidad,
  detalle.precio_unitario,
  detalle.subtotal
]
      );

    }

    await connection.commit();

    return {
      mensaje: "Pedido creado",
      idPedido
    };

  } catch (error) {

    await connection.rollback();

    throw error;

  } finally {

    connection.release();

  }

};
export const obtenerPedidosDB = async () => {
  const [rows] = await pool.query(`
    SELECT
      p.id_pedido,
      p.id_cliente,
      CONCAT(c.nombres, ' ', c.apellidos) AS cliente,
      p.id_direccion,
      d.direccion,
      p.id_estado_pedido,
      ep.nombre_estado AS estado_pedido,
      p.total,
      p.fecha_pedido
    FROM pedidos p
    INNER JOIN clientes c
      ON p.id_cliente = c.id_cliente
    INNER JOIN direcciones d
      ON p.id_direccion = d.id_direccion
    INNER JOIN estados_pedido ep
      ON p.id_estado_pedido = ep.id_estado_pedido
    ORDER BY p.id_pedido DESC
  `);

  return rows;
};

export const obtenerDetallePedidoDB = async (
  idPedido: number
) => {

  const [rows] = await pool.query(`
    SELECT
      dp.id_detalle_pedido,
      dp.id_producto,
      p.nombre_producto,
      p.imagen,
      dp.cantidad,
      dp.precio_unitario,
      dp.subtotal
    FROM detalle_pedido dp
    INNER JOIN productos p
      ON dp.id_producto = p.id_producto
    WHERE dp.id_pedido = ?
  `, [idPedido]);

  return rows;

};

export const actualizarEstadoPedidoDB = async (
  idPedido: number,
  idEstadoPedido: number
) => {

  const [result]: any = await pool.query(`
    UPDATE pedidos
    SET id_estado_pedido = ?
    WHERE id_pedido = ?
  `, [
    idEstadoPedido,
    idPedido
  ]);

  return result;

};