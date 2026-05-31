import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.registrar.bind(authController));
router.post("/login", authController.login.bind(authController));

export default router;