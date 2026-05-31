<script setup lang="ts">

import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import { obtenerCarrito } from "../services/carrito.service";

const router = useRouter();

const cantidadProductos = ref(0);
const route = useRoute();

const usuario = ref<any>(null);

const cargarCantidad = () => {

  const carrito = obtenerCarrito();

  cantidadProductos.value = carrito.reduce(
    (total: number, item: any) =>
      total + item.cantidad,
    0
  );

};

const cargarUsuario = () => {

  const usuarioStorage = localStorage.getItem("usuario");

  usuario.value = usuarioStorage
    ? JSON.parse(usuarioStorage)
    : null;

};

const cerrarSesion = () => {

  localStorage.removeItem("usuario");

  usuario.value = null;

  router.push("/login");

};

onMounted(() => {
  cargarCantidad();
  cargarUsuario();
});

watch(
  () => route.fullPath,
  () => {
    cargarCantidad();
    cargarUsuario();
  }
);

</script>

<template>

  <nav
    class="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top"
  >

    <div class="container">

      <RouterLink
        class="navbar-brand fw-bold fs-3"
        to="/"
      >
        <i class="bi bi-stars me-2"></i>
        SUPERNOVA
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupernova"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        id="navbarSupernova"
      >

        <ul class="navbar-nav ms-auto">

          <!-- INICIO -->

          <li
            v-if="!usuario || usuario.id_rol === 2"
            class="nav-item"
          >

            <RouterLink
              class="nav-link"
              to="/"
            >
              <i class="bi bi-house-fill me-1"></i>
              Inicio
            </RouterLink>

          </li>

          <!-- MIS PEDIDOS -->

          <li
            v-if="usuario && usuario.id_rol === 2"
            class="nav-item"
          >

            <RouterLink
              class="nav-link"
              to="/mis-pedidos"
            >
              <i class="bi bi-bag-check-fill me-1"></i>
              Mis pedidos
            </RouterLink>

          </li>

          <!-- MI PERFIL -->

          <li
            v-if="usuario && usuario.id_rol === 2"
            class="nav-item"
          >

            <RouterLink
              class="nav-link"
              to="/mi-perfil"
            >
              <i class="bi bi-person-circle me-1"></i>
              Mi perfil
            </RouterLink>

          </li>

          <!-- ADMIN -->

          <li
            v-if="usuario && usuario.id_rol === 1"
            class="nav-item"
          >

            <RouterLink
              class="nav-link"
              to="/admin"
            >
              <i class="bi bi-speedometer2 me-1"></i>
              Admin
            </RouterLink>

          </li>

          <!-- CARRITO -->

          <li
            v-if="!usuario || usuario.id_rol === 2"
            class="nav-item"
          >

            <RouterLink
              class="nav-link position-relative"
              to="/carrito"
            >
              <i class="bi bi-cart-fill me-1"></i>
              Carrito

              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ cantidadProductos }}
              </span>

            </RouterLink>

          </li>

          <!-- LOGIN -->

          <li
            v-if="!usuario"
            class="nav-item"
          >

            <RouterLink
              class="nav-link"
              to="/login"
            >
              <i class="bi bi-box-arrow-in-right me-1"></i>
              Login
            </RouterLink>

          </li>

          <!-- REGISTRO -->

          <li
            v-if="!usuario"
            class="nav-item"
          >

            <RouterLink
              class="nav-link"
              to="/registro"
            >
              <i class="bi bi-person-plus-fill me-1"></i>
              Registro
            </RouterLink>

          </li>

          <!-- MENU USUARIO -->

          <li
            v-else
            class="nav-item dropdown"
          >

            <a
              class="nav-link dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-person-circle me-1"></i>
              {{ usuario.nombre }}
            </a>

            <ul class="dropdown-menu dropdown-menu-end">

              <!-- CLIENTE -->

              <li
                v-if="usuario && usuario.id_rol === 2"
              >

                <RouterLink
                  class="dropdown-item"
                  to="/mi-perfil"
                >
                  <i class="bi bi-person-fill me-2"></i>
                  Mi perfil
                </RouterLink>

              </li>

              <li
                v-if="usuario && usuario.id_rol === 2"
              >

                <RouterLink
                  class="dropdown-item"
                  to="/mis-pedidos"
                >
                  <i class="bi bi-bag-fill me-2"></i>
                  Mis pedidos
                </RouterLink>

              </li>

              <!-- ADMIN -->

              <li
                v-if="usuario && usuario.id_rol === 1"
              >

                <RouterLink
                  class="dropdown-item"
                  to="/admin"
                >
                  <i class="bi bi-speedometer2 me-2"></i>
                  Panel admin
                </RouterLink>

              </li>

              <li>

                <hr class="dropdown-divider">

              </li>

              <!-- CERRAR SESION -->

              <li>

                <button
                  class="dropdown-item"
                  @click="cerrarSesion"
                >
                  <i class="bi bi-box-arrow-right me-2"></i>
                  Cerrar sesión
                </button>

              </li>

            </ul>

          </li>

        </ul>

      </div>

    </div>

  </nav>

</template>