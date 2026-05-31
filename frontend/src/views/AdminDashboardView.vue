<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

import {
  obtenerPedidos
} from "../services/pedidos.service";

import {
  obtenerProductos
} from "../services/productos.service";

const totalVentas = ref(0);

const pedidosPendientes = ref(0);

const totalPedidos = ref(0);

const totalProductos = ref(0);

const cargarDashboard = async () => {

  try {

    const pedidos =
      await obtenerPedidos();

    const productos =
      await obtenerProductos();

    totalPedidos.value =
      pedidos.length;

    totalProductos.value =
      productos.length;

    totalVentas.value =
      pedidos.reduce(
        (
          acumulador: number,
          pedido: any
        ) =>
          acumulador +
          Number(pedido.total),
        0
      );

    pedidosPendientes.value =
      pedidos.filter(
        (pedido: any) =>
          pedido.id_estado_pedido === 1
      ).length;

  } catch (error) {

    console.log(error);

  }

};

onMounted(() => {
  cargarDashboard();
});
</script>

<template>
  <div class="container mt-5">

    <h1 class="mb-4">
      Dashboard Administrativo
    </h1>

    <div class="row g-4">

      <div class="col-md-3">

        <div
          class="card shadow border-0 bg-primary text-white"
        >

          <div class="card-body">

            <h5>
              Ventas Totales
            </h5>

            <h2>
              Q {{ totalVentas }}
            </h2>

          </div>

        </div>

      </div>

      <div class="col-md-3">

        <div
          class="card shadow border-0 bg-warning"
        >

          <div class="card-body">

            <h5>
              Pedidos Pendientes
            </h5>

            <h2>
              {{ pedidosPendientes }}
            </h2>

          </div>

        </div>

      </div>

      <div class="col-md-3">

        <div
          class="card shadow border-0 bg-success text-white"
        >

          <div class="card-body">

            <h5>
              Total Pedidos
            </h5>

            <h2>
              {{ totalPedidos }}
            </h2>

          </div>

        </div>

      </div>

      <div class="col-md-3">

        <div
          class="card shadow border-0 bg-dark text-white"
        >

          <div class="card-body">

            <h5>
              Productos
            </h5>

            <h2>
              {{ totalProductos }}
            </h2>

          </div>

        </div>

      </div>

    </div>
    <div class="row mt-5">

  <div class="col-md-4">
    <div class="card shadow-sm border-0">
      <div class="card-body text-center">
        <h5>Gestionar productos</h5>
        <p>Crear, editar y administrar productos.</p>

        <RouterLink
          to="/admin/productos"
          class="btn btn-primary"
        >
          Ver productos
        </RouterLink>
      </div>
    </div>
  </div>

  <div class="col-md-4">
    <div class="card shadow-sm border-0">
      <div class="card-body text-center">
        <h5>Gestionar pedidos</h5>
        <p>Ver pedidos y actualizar estados.</p>

        <RouterLink
          to="/admin/pedidos"
          class="btn btn-success"
        >
          Ver pedidos
        </RouterLink>
      </div>
    </div>
  </div>

  <div class="col-md-4 mt-4">
  <div class="card shadow-sm border-0">
    <div class="card-body text-center">

      <h5>
        Gestionar usuarios
      </h5>

      <p>
        Administrar usuarios y roles.
      </p>

      <RouterLink
        to="/admin/usuarios"
        class="btn btn-danger"
      >
        Ver usuarios
      </RouterLink>

    </div>
  </div>
</div>

  <div class="col-md-4">
    <div class="card shadow-sm border-0">
      <div class="card-body text-center">
        <h5>Volver a tienda</h5>
        <p>Regresar al catálogo principal.</p>

        <RouterLink
          to="/"
          class="btn btn-dark"
        >
          Ir a tienda
        </RouterLink>
      </div>
    </div>
  </div>

</div>

  </div>
</template>