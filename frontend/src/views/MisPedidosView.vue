<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import {
  obtenerPedidos,
  obtenerDetallePedido
} from "../services/pedidos.service";

const pedidos = ref<any[]>([]);

const detallesPedido = ref<any[]>([]);

const pedidoSeleccionado = ref<number | null>(
  null
);

const cargarPedidos = async () => {

  try {

    const usuario = JSON.parse(
      localStorage.getItem("usuario") || "{}"
    );

    const todosPedidos =
      await obtenerPedidos();

    const idCliente = usuario.id_cliente;

      if (!idCliente) {
        pedidos.value = [];
        return;
      }

        pedidos.value =
        todosPedidos.filter(
        (pedido: any) =>
        pedido.id_cliente === idCliente
  );

  } catch (error) {

    console.log(error);

  }

};

const verDetalle = async (
  idPedido: number
) => {

  try {

    pedidoSeleccionado.value =
      idPedido;

    detallesPedido.value =
      await obtenerDetallePedido(
        idPedido
      );

  } catch (error) {

    console.log(error);

  }

};

const formatearFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString("es-GT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const claseEstadoPedido = (idEstado: number) => {
  return {
    "bg-warning text-dark": idEstado === 1,
    "bg-primary": idEstado === 2,
    "bg-info text-dark": idEstado === 3,
    "bg-success": idEstado === 4,
    "bg-danger": idEstado === 5
  };
};
const router = useRouter();

onMounted(() => {
  cargarPedidos();
});
</script>

<template>
  <div class="container mt-5">

    <button
  class="btn btn-outline-secondary mb-3"
  @click="router.back()"
>
  ← Regresar
</button>

    <h1 class="mb-4">
      Mis Pedidos
    </h1>

    <div v-if="pedidos.length === 0">

      <div class="alert alert-info">
        No tienes pedidos realizados
      </div>

    </div>

    <div v-else>

      <div
        class="card shadow-sm mb-3"
        v-for="pedido in pedidos"
        :key="pedido.id_pedido"
      >

        <div class="card-body">

          <div
            class="d-flex justify-content-between align-items-center"
          >

            <div>

              <h5>
                Pedido #{{ pedido.id_pedido }}
              </h5>

              <p class="mb-1">
                Fecha:
                {{ formatearFecha(pedido.fecha_pedido) }}
              </p>

              <p class="mb-1">
                Total:
                Q {{ pedido.total }}
              </p>

              <span
                class="badge"
                :class="claseEstadoPedido(pedido.id_estado_pedido)"
              >
                {{ pedido.estado_pedido }}
              </span>

            </div>

            <button
              class="btn btn-dark"
              @click="
                verDetalle(
                  pedido.id_pedido
                )
              "
            >
              Ver detalle
            </button>

          </div>

        </div>

      </div>

      <div
        v-if="pedidoSeleccionado"
        class="mt-5"
      >

        <h3>
          Detalle del pedido
          #{{ pedidoSeleccionado }}
        </h3>

        <table
          class="table table-bordered"
        >

          <thead>

            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>

          </thead>

          <tbody>

            <tr
              v-for="detalle in detallesPedido"
              :key="detalle.id_detalle_pedido"
            >

              <td>
                <img
                  :src="`https://supernova-production-ff0a.up.railway.app/img/${detalle.imagen}`"
                  width="70"
                  class="img-thumbnail"
                />
              </td>

              <td>
                {{ detalle.nombre_producto }}
              </td>

              <td>
                {{ detalle.cantidad }}
              </td>

              <td>
                Q {{ detalle.precio_unitario }}
              </td>

              <td>
                Q {{ detalle.subtotal }}
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>
</template>