import { RegistroUsuario } from "../domain/RegistroUsuario";
import { AuthRepository } from "../repositories/auth.repository";

const authRepository = new AuthRepository();

export class AuthService {

    async registrar(usuario: RegistroUsuario) {
        if (!usuario.nombre || !usuario.correo || !usuario.password) {
            throw new Error("Nombre, correo y password son obligatorios");
        }

        return await authRepository.registrarUsuario(usuario);
    }
    async login(correo: string, password: string) {

    const usuario = await authRepository.buscarPorCorreo(correo);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    if (usuario.password !== password) {
        throw new Error("Contraseña incorrecta");
    }

    const { password: _, ...usuarioSinPassword } = usuario;

return usuarioSinPassword;
}
}
