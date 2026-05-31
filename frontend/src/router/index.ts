import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductoDetalleView from '../views/ProductoDetalleView.vue'
import CarritoView from '../views/CarritoView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import AdminView from '../views/AdminView.vue'
import AdminProductosView from '../views/AdminProductosView.vue'
import AdminNuevoProductoView from '../views/AdminNuevoProductoView.vue'
import AdminEditarProductoView from '../views/AdminEditarProductoView.vue'
import PedidosAdminView from "../views/PedidosAdminView.vue"
import AdminDashboardView from "../views/AdminDashboardView.vue"
import MisPedidosView from "../views/MisPedidosView.vue"
import AdminUsuariosView from "../views/AdminUsuariosView.vue"
import AdminNuevoUsuarioView from "../views/AdminNuevoUsuarioView.vue";
import MiPerfilView from "../views/MiPerfilView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
  path: '/producto/:id',
  name: 'producto-detalle',
  component: ProductoDetalleView
},
{
  path: '/carrito',
  name: 'carrito',
  component: CarritoView
},

{
  path: '/login',
  name: 'login',
  component: LoginView
},
{
  path: '/registro',
  name: 'registro',
  component: RegistroView
},
{
  path: '/admin',
  redirect: '/admin/dashboard'
},
{
  path: '/admin/productos',
  name: 'admin-productos',
  component: AdminProductosView
},
{
  path: '/admin/productos/nuevo',
  name: 'admin-nuevo-producto',
  component: AdminNuevoProductoView
},
{
  path: '/admin/productos/editar/:id',
  name: 'admin-editar-producto',
  component: AdminEditarProductoView
},
{
  path: "/admin/pedidos",
  name: "admin-pedidos",
  component: PedidosAdminView
},
{
  path: '/admin/dashboard',
  name: 'admin-dashboard',
  component: AdminDashboardView
},
{
  path: "/mis-pedidos",
  name: "mis-pedidos",
  component: MisPedidosView
},
{
  path: "/admin/usuarios",
  name: "admin-usuarios",
  component: AdminUsuariosView
},
{
  path: "/admin/usuarios/nuevo",
  name: "admin-nuevo-usuario",
  component: AdminNuevoUsuarioView
},
{
  path: "/mi-perfil",
  name: "mi-perfil",
  component: MiPerfilView
},
  ]
});

router.beforeEach((to, from, next) => {
  const usuarioStorage = localStorage.getItem("usuario");

  const usuario = usuarioStorage
    ? JSON.parse(usuarioStorage)
    : null;

  if (to.path.startsWith("/admin")) {
    if (!usuario) {
      alert("Debes iniciar sesión");
      return next("/login");
    }

    if (usuario.id_rol !== 1) {
      alert("No tienes permisos de administrador");
      return next("/");
    }
  }

  next();
});

export default router