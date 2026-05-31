import pool from "../../common/persistence/db";
import { RegistroUsuario } from "../domain/RegistroUsuario";

export class AuthRepository {

    async registrarUsuario(usuario: RegistroUsuario) {

    const connection =
        await pool.getConnection();

    try {

        await connection.beginTransaction();

        const sqlUsuario = `
            INSERT INTO usuarios
            (
                nombre,
                correo,
                password,
                id_rol,
                estado
            )
            VALUES (?, ?, ?, ?, true)
        `;

        const valoresUsuario = [
            usuario.nombre,
            usuario.correo,
            usuario.password,
            usuario.id_rol || 2
        ];

        const [resultadoUsuario]: any =
            await connection.query(
                sqlUsuario,
                valoresUsuario
            );

        const idUsuario =
            resultadoUsuario.insertId;

        /*
            SI ES CLIENTE
            TAMBIÉN CREAR CLIENTE
        */

        if (
            (usuario.id_rol || 2) === 2
        ) {

            const sqlCliente = `
                INSERT INTO clientes
                (
                    id_usuario,
                    telefono,
                    nombres,
                    apellidos,
                    dpi,
                    nit,
                    fecha_nacimiento
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            await connection.query(
                sqlCliente,
                [
                    idUsuario,
                    "",
                    usuario.nombre,
                    "",
                    "",
                    "CF",
                    null
                ]
            );

        }

        await connection.commit();

        return resultadoUsuario;

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {

        connection.release();

    }

}
    async buscarPorCorreo(correo: string) {

    const sql = `
    SELECT
        u.id_usuario,
        u.nombre,
        u.correo,
        u.password,
        u.id_rol,
        u.estado,
        c.id_cliente
    FROM usuarios u
    LEFT JOIN clientes c
        ON u.id_usuario = c.id_usuario
    WHERE u.correo = ?
    LIMIT 1
`;

    const [rows]: any = await pool.query(sql, [correo]);

    return rows[0];
}
}