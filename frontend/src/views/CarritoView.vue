<script setup lang="ts">
import { ref, onMounted } from "vue";
import { crearPedido } from "../services/pedidos.service";
import {
  obtenerDireccionesCliente,
  crearDireccion
} from "../services/direcciones.service";
import {
  obtenerMetodosPago,
  crearPago
} from "../services/pagos.service";
import { useRouter } from "vue-router";

import {
  obtenerCarrito,
  eliminarDelCarrito,
  calcularTotal,
  aumentarCantidad,
  disminuirCantidad,
  vaciarCarrito
} from "../services/carrito.service";

const carrito = ref<any[]>([]);
const total = ref(0);
const direcciones = ref<any[]>([]);

const direccionSeleccionada = ref("");
const nuevaDireccion = ref("");
const nuevoMunicipio = ref("");
const nuevoDepartamento = ref("");
const nuevaReferencia = ref("");
const metodosPago = ref<any[]>([]);

const metodoPagoSeleccionado = ref("");
const numeroTarjeta = ref("");
const nombreTitular = ref("");
const fechaVencimiento = ref("");
const cvv = ref("");
const bancoTransferencia = ref("");
const referenciaTransferencia = ref("");
const nitFactura = ref("CF");

const router = useRouter();

const cargarCarrito = () => {
  carrito.value = obtenerCarrito();
  total.value = calcularTotal();
};

const cargarDirecciones = async () => {
  try {
    const usuario = JSON.parse(
      localStorage.getItem("usuario") || "{}"
    );

    const idCliente = usuario.id_cliente;

    if (!idCliente) {
      alert("Este usuario no tiene cliente asociado");
      return;
    }

    direcciones.value =
      await obtenerDireccionesCliente(idCliente);

  } catch (error) {
    console.log(error);
  }
};

const cargarMetodosPago = async () => {
  try {
    metodosPago.value =
      await obtenerMetodosPago();
  } catch (error) {
    console.log(error);
  }
};

const guardarDireccion = async () => {
  try {
    const usuario = JSON.parse(
      localStorage.getItem("usuario") || "{}"
    );

    const idCliente = usuario.id_cliente;

    if (!idCliente) {
      alert("Usuario sin cliente asociado");
      return;
    }

    await crearDireccion({
      id_cliente: idCliente,
      direccion: nuevaDireccion.value,
      municipio: nuevoMunicipio.value,
      departamento: nuevoDepartamento.value,
      referencia: nuevaReferencia.value
    });

    alert("Dirección agregada correctamente");

    nuevaDireccion.value = "";
    nuevoMunicipio.value = "";
    nuevoDepartamento.value = "";
    nuevaReferencia.value = "";

    await cargarDirecciones();

  } catch (error) {
    console.log(error);
    alert("Error al guardar dirección");
  }
};

const eliminarProducto = (id: number) => {
  eliminarDelCarrito(id);
  cargarCarrito();
};

const sumarCantidad = (id: number) => {
  aumentarCantidad(id);
  cargarCarrito();
};

const restarCantidad = (id: number) => {
  disminuirCantidad(id);
  cargarCarrito();
};

const limpiarCarrito = () => {
  vaciarCarrito();
  cargarCarrito();
};

const confirmarPedido = async () => {
  try {
    if (carrito.value.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const usuario = JSON.parse(
      localStorage.getItem("usuario") || "{}"
    );

    const idCliente = usuario.id_cliente;

    if (!idCliente) {
      alert("Este usuario no tiene cliente asociado");
      return;
    }

    if (!direccionSeleccionada.value) {
      alert("Selecciona una dirección");
      return;
    }

    if (!metodoPagoSeleccionado.value) {
      alert("Selecciona un método de pago");
      return;
    }

    if (!nitFactura.value) {
      alert("Ingresa un NIT para facturación");
      return;
    }

    if (metodoPagoSeleccionado.value == "1") {
      if (
        !numeroTarjeta.value ||
        !nombreTitular.value ||
        !fechaVencimiento.value ||
        !cvv.value
      ) {
        alert("Completa los datos de tarjeta");
        return;
      }
    }

    if (metodoPagoSeleccionado.value == "2") {
      if (
        !bancoTransferencia.value ||
        !referenciaTransferencia.value
      ) {
        alert("Completa los datos de transferencia");
        return;
      }
    }

    const pedido = {
  id_cliente: idCliente,
  id_estado_pedido: 1,
  id_direccion: Number(direccionSeleccionada.value),
  total: total.value,
  detalles: carrito.value.map(
    (producto: any) => ({
      id_producto: producto.id_producto,
      cantidad: producto.cantidad,
      precio_unitario: producto.precio,
      subtotal: producto.precio * producto.cantidad
    })
  )
};

    const response =
      await crearPedido(pedido);

    await crearPago({
      id_pedido: response.resultado.idPedido,
      id_metodo_pago: Number(metodoPagoSeleccionado.value),
      nit_factura: nitFactura.value,
      monto: total.value,
      estado_pago: "Pagado"
    });

    alert("Pedido realizado correctamente");

    vaciarCarrito();
    cargarCarrito();

  } catch (error: any) {
  console.log("ERROR COMPLETO:", error);
  console.log("RESPUESTA BACKEND:", error.response?.data);

  alert(
    error.response?.data?.message ||
    error.response?.data?.error ||
    "Error al crear pedido"
  );
}
};

onMounted(() => {
  cargarCarrito();
  cargarDirecciones();
  cargarMetodosPago();
});
</script>

<template>
  <div class="container mt-5">

    <button
      class="btn btn-outline-secondary mb-3"
      @click="router.back()"
    >
      <i class="bi bi-arrow-left-circle me-1"></i>
      Regresar
    </button>

    <h1 class="mb-4">
      <i class="bi bi-cart-fill me-2"></i>
      Carrito de Compras
    </h1>

    <div v-if="carrito.length === 0">
      <div class="alert alert-info">
        <i class="bi bi-info-circle me-2"></i>
        El carrito está vacío
      </div>
    </div>

    <div v-else>

      <div
        class="card mb-3 shadow-sm"
        v-for="producto in carrito"
        :key="producto.id_producto"
      >

        <div class="card-body">

          <div class="row align-items-center">

            <div class="col-md-4">

              <h5>
                <i class="bi bi-box-seam me-2"></i>
                {{ producto.nombre_producto }}
              </h5>

            </div>

            <div class="col-md-3">

              <button
                class="btn btn-outline-secondary btn-sm"
                @click="restarCantidad(producto.id_producto)"
              >
                <i class="bi bi-dash"></i>
              </button>

              <span class="mx-3">
                {{ producto.cantidad }}
              </span>

              <button
                class="btn btn-outline-secondary btn-sm"
                @click="sumarCantidad(producto.id_producto)"
              >
                <i class="bi bi-plus"></i>
              </button>

            </div>

            <div class="col-md-2">
              Q {{ producto.precio }}
            </div>

            <div class="col-md-2 fw-bold">
              Q {{ producto.precio * producto.cantidad }}
            </div>

            <div class="col-md-1">

              <button
                class="btn btn-danger btn-sm"
                @click="eliminarProducto(producto.id_producto)"
              >
                <i class="bi bi-trash-fill"></i>
              </button>

            </div>

          </div>

        </div>

      </div>

      <div class="mb-4">

        <label class="form-label fw-bold">
          <i class="bi bi-geo-alt-fill me-1"></i>
          Dirección de entrega
        </label>

        <select
          class="form-select"
          v-model="direccionSeleccionada"
        >

          <option value="">
            Selecciona una dirección
          </option>

          <option
            v-for="direccion in direcciones"
            :key="direccion.id_direccion"
            :value="direccion.id_direccion"
          >
            {{ direccion.direccion }} - {{ direccion.municipio }}
          </option>

        </select>

      </div>

      <div class="mb-4">

        <label class="form-label fw-bold">
          <i class="bi bi-credit-card-fill me-1"></i>
          Método de pago
        </label>

        <select
          class="form-select"
          v-model="metodoPagoSeleccionado"
        >

          <option value="">
            Selecciona método de pago
          </option>

          <option
            v-for="metodo in metodosPago"
            :key="metodo.id_metodo_pago"
            :value="metodo.id_metodo_pago"
          >
            {{ metodo.nombre_metodo }}
          </option>

        </select>

      </div>

      <div class="mb-4">

        <label class="form-label fw-bold">
          <i class="bi bi-receipt me-1"></i>
          NIT para facturación
        </label>

        <input
          type="text"
          class="form-control"
          placeholder="CF o NIT"
          v-model="nitFactura"
        />

      </div>

      <div
        v-if="metodoPagoSeleccionado == '1'"
        class="card shadow-sm mb-4"
      >

        <div class="card-body">

          <h5 class="mb-3">
            <i class="bi bi-credit-card-2-front-fill me-2"></i>
            Datos de tarjeta
          </h5>

          <div class="mb-3">

            <input
              type="text"
              class="form-control"
              placeholder="Número de tarjeta"
              v-model="numeroTarjeta"
            />

          </div>

          <div class="mb-3">

            <input
              type="text"
              class="form-control"
              placeholder="Nombre del titular"
              v-model="nombreTitular"
            />

          </div>

          <div class="row">

            <div class="col-md-6 mb-3">

              <input
                type="text"
                class="form-control"
                placeholder="MM/YY"
                v-model="fechaVencimiento"
              />

            </div>

            <div class="col-md-6 mb-3">

              <input
                type="text"
                class="form-control"
                placeholder="CVV"
                v-model="cvv"
              />

            </div>

          </div>

        </div>

      </div>

      <div
        v-if="metodoPagoSeleccionado == '2'"
        class="card shadow-sm mb-4"
      >

        <div class="card-body">

          <h5 class="mb-3">
            <i class="bi bi-bank me-2"></i>
            Datos de transferencia
          </h5>

          <div class="mb-3">

            <select
              class="form-select"
              v-model="bancoTransferencia"
            >

              <option value="">
                Selecciona banco
              </option>

              <option>
                Banco Industrial
              </option>

              <option>
                Banrural
              </option>

              <option>
                BAC
              </option>

            </select>

          </div>

          <div class="mb-3">

            <input
              type="text"
              class="form-control"
              placeholder="Número de referencia"
              v-model="referenciaTransferencia"
            />

          </div>

        </div>

      </div>

      <div
        v-if="direcciones.length === 0"
        class="mt-4"
      >

        <div class="alert alert-warning">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          No tienes direcciones registradas
        </div>

        <div class="card shadow-sm">

          <div class="card-body">

            <h5 class="mb-3">
              <i class="bi bi-geo-alt-fill me-2"></i>
              Agregar dirección
            </h5>

            <div class="mb-3">

              <input
                type="text"
                class="form-control"
                placeholder="Dirección"
                v-model="nuevaDireccion"
              />

            </div>

            <div class="mb-3">

              <input
                type="text"
                class="form-control"
                placeholder="Municipio"
                v-model="nuevoMunicipio"
              />

            </div>

            <div class="mb-3">

              <input
                type="text"
                class="form-control"
                placeholder="Departamento"
                v-model="nuevoDepartamento"
              />

            </div>

            <div class="mb-3">

              <input
                type="text"
                class="form-control"
                placeholder="Referencia"
                v-model="nuevaReferencia"
              />

            </div>

            <button
              class="btn btn-primary"
              @click="guardarDireccion"
            >
              <i class="bi bi-save-fill me-1"></i>
              Guardar dirección
            </button>

          </div>

        </div>

      </div>

      <div class="text-end mt-4">

        <h3>
          <i class="bi bi-cash-stack me-2"></i>
          Total: Q {{ total }}
        </h3>

        <button
          class="btn btn-outline-danger mt-2"
          @click="limpiarCarrito"
        >
          <i class="bi bi-trash-fill me-1"></i>
          Vaciar carrito
        </button>

        <button
          class="btn btn-success mt-2 ms-2"
          @click="confirmarPedido"
        >
          <i class="bi bi-check-circle-fill me-1"></i>
          Confirmar Pedido
        </button>

      </div>

    </div>

  </div>
</template>