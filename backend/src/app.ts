import express from "express";
import cors from "cors";
import pool from "./common/persistence/db";
import authRoutes from "./autenticacion/routes/auth.routes";
import productosRoutes from "./productos/routes/productos.routes";
import categoriasRoutes from "./categorias/routes/categorias.routes";
import path from "path";
import marcasRoutes from "./marcas/routes/marcas.routes";
import pedidosRoutes from "./pedidos/routes/pedidos.routes";
import usuariosRoutes from "./usuarios/routes/usuarios.routes";
import direccionesRoutes from "./direcciones/routes/direcciones.routes";
import pagosRoutes from "./pagos/routes/pagos.routes";
import dashboardRoutes from "./dashboard/routes/dashboard.routes";
import clientesRoutes from "./clientes/routes/clientes.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/img", express.static(path.join(__dirname, "../public/img")));

app.use("/api/pedidos", pedidosRoutes);
app.use("/api/marcas", marcasRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/direcciones", direccionesRoutes);
app.use("/api/pagos", pagosRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/clientes", clientesRoutes);

app.get("/", (req, res) => {
    res.send("API Supernova funcionando");
});

app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1");

        res.json({
            mensaje: "Conexión exitosa con MySQL",
            rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error conectando a MySQL"
        });
    }
});



export default app;