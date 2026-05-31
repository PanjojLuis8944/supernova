<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const productos = ref<any[]>([]);
const router = useRouter();

const cargarProductos = async () => {
  const response = await axios.get("https://supernova-production-ff0a.up.railway.app/api/productos");
  productos.value = response.data;
};

const eliminarProducto = async (id: number) => {
  const confirmar = confirm("¿Seguro que deseas eliminar este producto?");

  if (!confirmar) {
    return;
  }

  await axios.delete(`https://supernova-production-ff0a.up.railway.app/api/productos/${id}`);

  alert("Producto eliminado correctamente");

  cargarProductos();
};

onMounted(() => {
  cargarProductos();
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

    <div class="d-flex justify-content-between align-items-center mb-4">

      <h1>
        <i class="bi bi-box-seam me-2"></i>
        Administración de Productos
      </h1>

      <RouterLink
        to="/admin/productos/nuevo"
        class="btn btn-dark"
      >
        <i class="bi bi-plus-circle me-1"></i>
        Nuevo producto
      </RouterLink>

    </div>

    <div class="card shadow border-0">

      <div class="card-body">

        <table class="table table-hover align-middle">

          <thead class="table-dark">

            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Stock</th>

              <th class="text-end">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="producto in productos"
              :key="producto.id_producto"
            >

              <td>
                {{ producto.id_producto }}
              </td>

              <td>

                <img
                  :src="`https://supernova-production-ff0a.up.railway.app/img/${producto.imagen}`"
                  width="60"
                  height="45"
                  class="rounded object-fit-cover"
                >

              </td>

              <td>
                {{ producto.nombre_producto }}
              </td>

              <td>
                {{ producto.categoria }}
              </td>

              <td>
                {{ producto.marca }}
              </td>

              <td>
                Q {{ producto.precio }}
              </td>

              <td>
                {{ producto.stock }}
              </td>

              <td class="text-end">

                <RouterLink
                  :to="`/admin/productos/editar/${producto.id_producto}`"
                  class="btn btn-warning btn-sm me-2"
                >
                  <i class="bi bi-pencil-square me-1"></i>
                  Editar
                </RouterLink>

                <button
                  class="btn btn-danger btn-sm"
                  @click="eliminarProducto(producto.id_producto)"
                >
                  <i class="bi bi-trash-fill me-1"></i>
                  Eliminar
                </button>

              </td>

            </tr>

          </tbody>

        </table>

        <div
          v-if="productos.length === 0"
          class="alert alert-info mt-3"
        >

          <i class="bi bi-info-circle me-2"></i>

          No hay productos registrados.

        </div>

      </div>

    </div>

  </div>
</template>