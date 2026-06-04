<script setup lang="ts">
import { ref, onMounted, computed  } from "vue";
import { useRouter, useRoute  } from "vue-router";


const router = useRouter();
const route = useRoute();

import {
  obtenerPedidos,
  obtenerDetallePedido,
  actualizarEstadoPedido
} from "../services/pedidos.service";
import { obtenerPagoPorPedido } from "../services/pagos.service";

const pedidos = ref<any[]>([]);

const pedidosFiltrados = computed(() => {
  const estado = route.query.estado;

  if (!estado) {
    return pedidos.value;
  }

  return pedidos.value.filter(
    (pedido: any) =>
      pedido.id_estado_pedido === Number(estado)
  );
});

const detallesPedido = ref<any[]>([]);

const pagoPedido = ref<any>(null);

const pedidoSeleccionado = ref<number | null>(
  null
);

const cargarPedidos = async () => {

  try {

    pedidos.value =
      await obtenerPedidos();

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

      pagoPedido.value =
  await obtenerPagoPorPedido(idPedido);

  } catch (error) {

    console.log(error);

  }

};

const cambiarEstado = async (
  idPedido: number,
  idEstadoPedido: number
) => {

  try {

    await actualizarEstadoPedido(
      idPedido,
      idEstadoPedido
    );

    alert(
      "Estado actualizado correctamente"
    );

    cargarPedidos();

  } catch (error) {

    console.log(error);

    alert(
      "Error al actualizar estado"
    );

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
      Administración de Pedidos
    </h1>

    <div class="table-responsive">

      <table
        class="table table-bordered table-hover"
      >

        <thead class="table-dark">

          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>

        </thead>

        <tbody>

          <tr
            v-for="pedido in pedidosFiltrados"
            :key="pedido.id_pedido"
          >

            <td>
              #{{ pedido.id_pedido }}
            </td>

            <td>
              {{ pedido.cliente }}
            </td>

            <td>
              Q {{ pedido.total }}
            </td>

            <td>

          <span
          class="badge"
          :class="claseEstadoPedido(pedido.id_estado_pedido)"
        >
          {{ pedido.estado_pedido }}
        </span>

  <select
  class="form-select mt-2 estado-select"
  :value="pedido.id_estado_pedido"
  @change="
    cambiarEstado(
      pedido.id_pedido,
      Number(
        ($event.target as HTMLSelectElement).value
      )
    )
  "
>

                <option value="1">
                  Pendiente
                </option>

                <option value="2">
                  Pagado
                </option>

                <option value="3">
                  Enviado
                </option>

                <option value="4">
                  Entregado
                </option>

                <option value="5">
                  Cancelado
                </option>

              </select>

            </td>

            <td>
              {{ formatearFecha(pedido.fecha_pedido) }}
            </td>

            <td>

              <button
                class="btn btn-primary btn-sm"
                @click="
                  verDetalle(
                    pedido.id_pedido
                  )
                "
              >
                Ver detalle
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <div
      v-if="pedidoSeleccionado"
      class="mt-5"
    >

      <h3>
        Detalle del pedido
        #{{ pedidoSeleccionado }}
      </h3>

      <div
  v-if="pagoPedido"
  class="card shadow-sm mb-4"
>
  <div class="card-body">

    <h5 class="mb-3">
      Información de pago
    </h5>

    <p class="mb-1">
      <strong>Método:</strong>
      {{ pagoPedido.nombre_metodo }}
    </p>

    <p class="mb-1">
      <strong>Monto:</strong>
      Q {{ pagoPedido.monto }}
    </p>

    <p class="mb-1">
      <strong>Estado pago:</strong>
      {{ pagoPedido.estado_pago }}
    </p>

    <p class="mb-1">
      <strong>NIT factura:</strong>
      {{ pagoPedido.nit_factura || "CF" }}
    </p>

  </div>
</div>
      
      <table
        class="table table-striped"
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
</template>