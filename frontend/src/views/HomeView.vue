<script setup lang="ts">
import { onMounted, ref, computed } from "vue";

import { obtenerProductos } from "../services/productos.service";
import { obtenerCategorias } from "../services/categorias.service";


const productos = ref<any[]>([]);
const busqueda = ref("");
const categorias = ref<any[]>([]);

const categoriaSeleccionada = ref("");

const productosFiltrados = computed(() => {

  return productos.value.filter(
    (producto: any) => {

      const coincideBusqueda =
        producto.nombre_producto
          .toLowerCase()
          .includes(
            busqueda.value.toLowerCase()
          );

      const coincideCategoria =

        categoriaSeleccionada.value === ""

        ||

        producto.categoria ===
        categoriaSeleccionada.value;

      return (
        coincideBusqueda &&
        coincideCategoria
      );

    }
  );

});

onMounted(async () => {

  productos.value =
    await obtenerProductos();

  categorias.value =
    await obtenerCategorias();

});
</script>

<template>
  <div>

    <!-- HERO -->

    <section class="bg-dark text-white py-3 mb-3">
      <div class="container text-center">

        <h1 class="display-5 fw-bold">
          SUPERNOVA
        </h1>

        <p class="lead mt-3">
          Tecnología de otro nivel
        </p>
          <div class="mt-4 mx-auto" style="max-width: 600px;">
          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="Buscar productos..."
            v-model="busqueda"
          />
        </div>
        <div class="mt-3 mx-auto" style="max-width: 400px;">

  <select
    class="form-select"
    v-model="categoriaSeleccionada"
  >

    <option value="">
      Todas las categorías
    </option>

    <option
      v-for="categoria in categorias"
      :key="categoria.id_categoria"
      :value="categoria.nombre_categoria"
    >
      {{ categoria.nombre_categoria }}
    </option>

  </select>

</div>

      </div>
      
    </section>

    <!-- PRODUCTOS -->

    <div class="container my-5">

      <h2 class="mb-4">
        Productos destacados
      </h2>

      <div class="row">

        <div
          class="col-md-4 mb-4"
          v-for="producto in productosFiltrados"
          :key="producto.id_producto"
        >

          <RouterLink
            :to="`/producto/${producto.id_producto}`"
            class="text-decoration-none text-dark"
          >

            <div class="card producto-card h-100 border-0 shadow-sm">

                <img
                  :src="`https://supernova-production-ff0a.up.railway.app/img/${producto.imagen}`"
                  class="card-img-top p-3"
                  style="height: 250px; object-fit: contain;"
                >

              <div class="card-body">

                <span class="badge bg-dark mb-2">
                  {{ producto.categoria }}
                </span>

                <h5 class="card-title">
                  {{ producto.nombre_producto }}
                </h5>

                <p class="card-text text-muted">
                  {{ producto.descripcion }}
                </p>

                <h4 class="text-primary fw-bold">
                  Q {{ producto.precio }}
                </h4>

              </div>

            </div>

          </RouterLink>

        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>

.producto-card {
  transition: transform 0.3s ease;
}

.producto-card:hover {
  transform: translateY(-8px);
}

</style>