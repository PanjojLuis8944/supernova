<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

import AdminSidebar from "../components/AdminSidebar.vue";

import {
  obtenerPedidos
} from "../services/pedidos.service";

import {
  obtenerProductos
} from "../services/productos.service";

const ventasFinalizadas = ref(0);

const pedidosPendientes = ref(0);
const pedidosPagados = ref(0);
const pedidosEnviados = ref(0);
const pedidosEntregados = ref(0);
const pedidosCancelados = ref(0);

const totalPedidos = ref(0);
const totalProductos = ref(0);
const ultimosPedidos = ref<any[]>([]);

const cargarDashboard = async () => {
  try {
    const pedidos = await obtenerPedidos();
    const productos = await obtenerProductos();

    totalPedidos.value = pedidos.length;
    totalProductos.value = productos.length;

    pedidosPendientes.value = pedidos.filter(
      (pedido: any) => pedido.id_estado_pedido === 1
    ).length;

    pedidosPagados.value = pedidos.filter(
      (pedido: any) => pedido.id_estado_pedido === 2
    ).length;

    pedidosEnviados.value = pedidos.filter(
      (pedido: any) => pedido.id_estado_pedido === 3
    ).length;

    pedidosEntregados.value = pedidos.filter(
      (pedido: any) => pedido.id_estado_pedido === 4
    ).length;

    pedidosCancelados.value = pedidos.filter(
      (pedido: any) => pedido.id_estado_pedido === 5
    ).length;

    ventasFinalizadas.value = pedidos
      .filter((pedido: any) => pedido.id_estado_pedido === 4)
      .reduce(
        (acumulador: number, pedido: any) =>
          acumulador + Number(pedido.total),
        0
      );

    ultimosPedidos.value = pedidos.slice(0, 5);

  } catch (error) {
    console.log(error);
  }
};

const textoEstado = (idEstado: number) => {
  if (idEstado === 1) return "Pendiente";
  if (idEstado === 2) return "Pagado";
  if (idEstado === 3) return "Enviado";
  if (idEstado === 4) return "Entregado";
  if (idEstado === 5) return "Cancelado";

  return "Sin estado";
};

const claseEstado = (idEstado: number) => {
  return {
    "bg-warning text-dark": idEstado === 1,
    "bg-primary": idEstado === 2,
    "bg-info text-dark": idEstado === 3,
    "bg-success": idEstado === 4,
    "bg-danger": idEstado === 5
  };
};

onMounted(() => {
  cargarDashboard();
});
</script>

<template>
  <div class="admin-layout">

    <AdminSidebar />

    <main class="admin-content">

      <div class="dashboard-header mb-4">
        <div>
          <h1>Panel Administrativo</h1>
          <p>
            Bienvenido al centro de control de Supernova.
          </p>
        </div>

        <RouterLink
          to="/"
          class="btn btn-outline-light"
        >
          <i class="bi bi-shop"></i>
          Ir a tienda
        </RouterLink>
      </div>

      <div class="row g-4 mb-4">

        <div class="col-md-3">
          <div class="card dashboard-card border-0 shadow-sm">
            <div class="card-body">
              <div class="dashboard-icon bg-primary">
                <i class="bi bi-cash-stack"></i>
              </div>

              <p>Ventas Finalizadas</p>

              <h3>
                Q {{ ventasFinalizadas.toFixed(2) }}
              </h3>

              <RouterLink
                to="/admin/pedidos?estado=4"
                class="small"
              >
                Ver entregados
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card dashboard-card border-0 shadow-sm">
            <div class="card-body">
              <div class="dashboard-icon bg-success">
                <i class="bi bi-cart-check"></i>
              </div>

              <p>Total Pedidos</p>

              <h3>
                {{ totalPedidos }}
              </h3>

              <RouterLink
                to="/admin/pedidos"
                class="small"
              >
                Ver todos
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card dashboard-card border-0 shadow-sm">
            <div class="card-body">
              <div class="dashboard-icon bg-dark">
                <i class="bi bi-box-seam"></i>
              </div>

              <p>Productos</p>

              <h3>
                {{ totalProductos }}
              </h3>

              <RouterLink
                to="/admin/productos"
                class="small"
              >
                Ir al listado
              </RouterLink>
            </div>
          </div>
        </div>

      </div>

      <div class="row g-4 mb-4">

        <div class="col-md-2">
          <div class="card dashboard-card border-0 shadow-sm">
            <div class="card-body">
              <div class="dashboard-icon bg-warning text-dark">
                <i class="bi bi-hourglass-split"></i>
              </div>

              <p>Pendientes</p>

              <h3>
                {{ pedidosPendientes }}
              </h3>

              <RouterLink
                to="/admin/pedidos?estado=1"
                class="small"
              >
                Ver pendientes
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="col-md-2">
          <div class="card dashboard-card border-0 shadow-sm">
            <div class="card-body">
              <div class="dashboard-icon bg-primary">
                <i class="bi bi-credit-card"></i>
              </div>

              <p>Pagados</p>

              <h3>
                {{ pedidosPagados }}
              </h3>

              <RouterLink
                to="/admin/pedidos?estado=2"
                class="small"
              >
                Ver pagados
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="col-md-2">
          <div class="card dashboard-card border-0 shadow-sm">
            <div class="card-body">
              <div class="dashboard-icon bg-info text-dark">
                <i class="bi bi-truck"></i>
              </div>

              <p>Enviados</p>

              <h3>
                {{ pedidosEnviados }}
              </h3>

              <RouterLink
                to="/admin/pedidos?estado=3"
                class="small"
              >
                Ver enviados
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="col-md-2">
          <div class="card dashboard-card border-0 shadow-sm">
            <div class="card-body">
              <div class="dashboard-icon bg-success">
                <i class="bi bi-check-circle"></i>
              </div>

              <p>Entregados</p>

              <h3>
                {{ pedidosEntregados }}
              </h3>

              <RouterLink
                to="/admin/pedidos?estado=4"
                class="small"
              >
                Ver entregados
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="col-md-2">
          <div class="card dashboard-card border-0 shadow-sm">
            <div class="card-body">
              <div class="dashboard-icon bg-danger">
                <i class="bi bi-x-circle"></i>
              </div>

              <p>Cancelados</p>

              <h3>
                {{ pedidosCancelados }}
              </h3>

              <RouterLink
                to="/admin/pedidos?estado=5"
                class="small"
              >
                Ver cancelados
              </RouterLink>
            </div>
          </div>
        </div>

      </div>

      <div class="dashboard-message mb-4">
        <i class="bi bi-quote"></i>
        Supernova conecta innovación, tecnología y una mejor experiencia de compra.
        <i class="bi bi-quote"></i>
      </div>

      <div class="row g-4">

        <div class="col-md-8">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white fw-bold">
              <i class="bi bi-receipt"></i>
              Últimos pedidos
            </div>

            <div class="card-body">
              <table class="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="pedido in ultimosPedidos"
                    :key="pedido.id_pedido"
                  >
                    <td>
                      #{{ pedido.id_pedido }}
                    </td>

                    <td>
                      {{ pedido.cliente }}
                    </td>

                    <td>
                      Q {{ Number(pedido.total).toFixed(2) }}
                    </td>

                    <td>
                      <span
                        class="badge"
                        :class="claseEstado(pedido.id_estado_pedido)"
                      >
                        {{ textoEstado(pedido.id_estado_pedido) }}
                      </span>
                    </td>
                  </tr>

                  <tr v-if="ultimosPedidos.length === 0">
                    <td
                      colspan="4"
                      class="text-center text-muted"
                    >
                      No hay pedidos registrados.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-md-4">

          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-white fw-bold">
              <i class="bi bi-lightning-charge"></i>
              Accesos rápidos
            </div>

            <div class="card-body d-grid gap-3">

              <RouterLink
                to="/admin/productos/nuevo"
                class="btn btn-primary"
              >
                <i class="bi bi-plus-circle"></i>
                Nuevo producto
              </RouterLink>

              <RouterLink
                to="/admin/productos"
                class="btn btn-outline-primary"
              >
                <i class="bi bi-box-seam"></i>
                Gestionar productos
              </RouterLink>

              <RouterLink
                to="/admin/pedidos"
                class="btn btn-outline-success"
              >
                <i class="bi bi-cart-check"></i>
                Gestionar pedidos
              </RouterLink>

              <RouterLink
                to="/admin/usuarios"
                class="btn btn-outline-danger"
              >
                <i class="bi bi-people"></i>
                Gestionar usuarios
              </RouterLink>

            </div>
          </div>

        </div>

      </div>

    </main>

  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f6f9;
}

.admin-content {
  flex: 1;
  padding: 30px;
}

.dashboard-header {
  background: linear-gradient(135deg, #0d6efd, #212529);
  color: white;
  padding: 25px;
  border-radius: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  margin: 0;
  font-weight: 700;
}

.dashboard-header p {
  margin: 5px 0 0;
  opacity: 0.9;
}

.dashboard-card {
  border-radius: 18px;
  transition: all 0.3s ease;
  height: 100%;
}

.dashboard-card:hover {
  transform: translateY(-5px);
}

.dashboard-card .card-body {
  padding: 24px;
}

.dashboard-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  margin-bottom: 15px;
}

.dashboard-card p {
  color: #6c757d;
  margin-bottom: 5px;
}

.dashboard-card h3 {
  font-weight: 700;
}

.dashboard-message {
  background: #e9f2ff;
  color: #0d6efd;
  padding: 16px;
  border-left: 5px solid #0d6efd;
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
}

.card {
  border-radius: 16px;
}

.card-header {
  border-radius: 16px 16px 0 0 !important;
}
</style>