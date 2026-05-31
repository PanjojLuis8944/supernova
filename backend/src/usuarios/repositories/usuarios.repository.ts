import pool from "../../common/persistence/db";

export const obtenerUsuariosDB =
  async () => {

    const [rows] = await pool.query(`
      SELECT
        u.id_usuario,
        u.nombre,
        u.correo,
        u.id_rol,
        r.nombre_rol,
        u.estado
      FROM usuarios u
      INNER JOIN roles r
        ON u.id_rol = r.id_rol
      ORDER BY u.id_usuario DESC
    `);

    return rows;

};

export const cambiarRolUsuarioDB =
  async (
    idUsuario: number,
    idRol: number
  ) => {

    const [result]: any =
      await pool.query(`
        UPDATE usuarios
        SET id_rol = ?
        WHERE id_usuario = ?
      `, [
        idRol,
        idUsuario
      ]);

    return result;

};

export const eliminarUsuarioDB =
  async (
    idUsuario: number
  ) => {

    const [result]: any =
      await pool.query(`
        DELETE FROM usuarios
        WHERE id_usuario = ?
      `, [idUsuario]);

    return result;

};
export const crearUsuarioDB =
  async (usuario: any) => {

    const [result]: any =
      await pool.query(`
        INSERT INTO usuarios
        (
          nombre,
          correo,
          password,
          id_rol,
          estado
        )
        VALUES (?, ?, ?, ?, ?)
      `, [
        usuario.nombre,
        usuario.correo,
        usuario.password,
        usuario.id_rol,
        1
      ]);

    return result;

};