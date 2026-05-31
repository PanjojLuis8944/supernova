<script setup lang="ts">
import { ref, onMounted } from "vue";

import {
  obtenerResumenDashboard
} from "../services/dashboard.service";

const resumen = ref<any>({
  total_productos: 0,
  total_usuarios: 0,
  total_pedidos: 0,
  total_ventas: 0
});

onMounted(async () => {

  resumen.value =
    await obtenerResumenDashboard();

});
</script>

<template>

  <div class="container mt-5">

    <h1 class="mb-5">
      <i class="bi bi-speedometer2 me-2"></i>
      Panel Administrativo
    </h1>

    <div class="row">

      <!-- PRODUCTOS -->

      <div class="col-md-3 mb-4">

        <div
          class="card shadow border-0 dashboard-card bg-primary text-white"
        >

          <div class="card-body text-center">

            <i class="bi bi-laptop fs-1"></i>

            <h5 class="mt-2">
              Productos
            </h5>

            <h1 class="fw-bold">
              {{ resumen.total_productos }}
            </h1>

          </div>

        </div>

      </div>

      <!-- USUARIOS -->

      <div class="col-md-3 mb-4">

        <div
          class="card shadow border-0 dashboard-card bg-success text-white"
        >

          <div class="card-body text-center">

            <i class="bi bi-people-fill fs-1"></i>

            <h5 class="mt-2">
              Usuarios
            </h5>

            <h1 class="fw-bold">
              {{ resumen.total_usuarios }}
            </h1>

          </div>

        </div>

      </div>

      <!-- PEDIDOS -->

      <div class="col-md-3 mb-4">

        <div
          class="card shadow border-0 dashboard-card bg-warning text-dark"
        >

          <div class="card-body text-center">

            <i class="bi bi-bag-fill fs-1"></i>

            <h5 class="mt-2">
              Pedidos
            </h5>

            <h1 class="fw-bold">
              {{ resumen.total_pedidos }}
            </h1>

          </div>

        </div>

      </div>

      <!-- VENTAS -->

      <div class="col-md-3 mb-4">

        <div
          class="card shadow border-0 dashboard-card bg-dark text-white"
        >

          <div class="card-body text-center">

            <i class="bi bi-currency-dollar fs-1"></i>

            <h5 class="mt-2">
              Ventas Totales
            </h5>

            <h2 class="fw-bold">
              Q {{ resumen.total_ventas }}
            </h2>

          </div>

        </div>

      </div>

    </div>

    <!-- ACCESOS RAPIDOS -->

    <div class="row mt-4">

      <div class="col-md-4 mb-4">

        <RouterLink
          to="/admin/productos"
          class="text-decoration-none"
        >

          <div
            class="card shadow-sm border-0 dashboard-link"
          >

            <div class="card-body text-center">

              <i
                class="bi bi-box-seam fs-1"
              ></i>

              <h4 class="mt-3">
                Productos
              </h4>

              <p>
                Administrar catálogo
              </p>

            </div>

          </div>

        </RouterLink>

      </div>

      <div class="col-md-4 mb-4">

        <RouterLink
          to="/admin/pedidos"
          class="text-decoration-none"
        >

          <div
            class="card shadow-sm border-0 dashboard-link"
          >

            <div class="card-body text-center">

              <i
                class="bi bi-bag-check-fill fs-1"
              ></i>

              <h4 class="mt-3">
                Pedidos
              </h4>

              <p>
                Gestionar pedidos
              </p>

            </div>

          </div>

        </RouterLink>

      </div>

      <div class="col-md-4 mb-4">

        <RouterLink
          to="/admin/usuarios"
          class="text-decoration-none"
        >

          <div
            class="card shadow-sm border-0 dashboard-link"
          >

            <div class="card-body text-center">

              <i
                class="bi bi-people-fill fs-1"
              ></i>

              <h4 class="mt-3">
                Usuarios
              </h4>

              <p>
                Administrar usuarios
              </p>

            </div>

          </div>

        </RouterLink>

      </div>

    </div>

  </div>

</template>

<style scoped>

.dashboard-card {
  transition: transform 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-5px);
}

.dashboard-link {
  transition: all 0.3s ease;
}

.dashboard-link:hover {
  transform: translateY(-5px);
}

.dashboard-card i {
  opacity: 0.9;
}

.dashboard-link i {
  color: #0d6efd;
}

</style>