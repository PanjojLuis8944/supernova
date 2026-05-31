import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {

    async registrar(req: Request, res: Response) {
        try {
            const resultado = await authService.registrar(req.body);

            res.status(201).json({
                mensaje: "Usuario registrado correctamente",
                resultado
            });

        } catch (error: any) {
            res.status(400).json({
                mensaje: error.message
            });
        }
    }
    async login(req: any, res: any) {

    try {

        const { correo, password } = req.body;

        const usuario = await authService.login(correo, password);

        res.json({
            mensaje: "Login exitoso",
            usuario
        });

    } catch (error: any) {

        res.status(400).json({
            mensaje: error.message
        });

    }
}
}