import pool from "../../common/persistence/db";

export const obtenerResumenDashboardDB =
  async () => {

    const [[productos]]: any =
      await pool.query(`
        SELECT COUNT(*) AS total_productos
        FROM productos
      `);

    const [[usuarios]]: any =
      await pool.query(`
        SELECT COUNT(*) AS total_usuarios
        FROM usuarios
      `);

    const [[pedidos]]: any =
      await pool.query(`
        SELECT COUNT(*) AS total_pedidos
        FROM pedidos
      `);

    const [[ventas]]: any =
      await pool.query(`
        SELECT
          IFNULL(SUM(total), 0)
          AS total_ventas
        FROM pedidos
      `);

    return {
      total_productos:
        productos.total_productos,

      total_usuarios:
        usuarios.total_usuarios,

      total_pedidos:
        pedidos.total_pedidos,

      total_ventas:
        ventas.total_ventas
    };

};