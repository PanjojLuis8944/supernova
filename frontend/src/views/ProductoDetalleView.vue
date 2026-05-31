<script setup lang="ts">

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { agregarAlCarrito } from "../services/carrito.service";
import { useRouter } from "vue-router";

import axios from "axios";

const route = useRoute();
const router = useRouter();

const producto = ref<any>(null);

    const agregarProducto = () => {

  agregarAlCarrito(producto.value);

  alert("Producto agregado al carrito");

};

onMounted(async () => {

  const id = route.params.id;

  const response = await axios.get(
    `https://supernova-production-ff0a.up.railway.app/api/productos/${id}`
  );

  producto.value = response.data;

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

    <div v-if="producto" class="row">

      <div class="col-md-6">

        <img
          :src="`https://supernova-production-ff0a.up.railway.app/img/${producto.imagen}`"
          class="img-fluid rounded shadow"
        >

      </div>

      <div class="col-md-6">

        <h1 class="mb-3">
          {{ producto.nombre_producto }}
        </h1>

        <p class="text-muted">
          {{ producto.descripcion }}
        </p>

        <h3 class="text-primary mb-3">
          Q {{ producto.precio }}
        </h3>

        <p>
          <strong>Categoría:</strong>
          {{ producto.categoria }}
        </p>

        <p>
          <strong>Marca:</strong>
          {{ producto.marca }}
        </p>

        <button
            class="btn btn-dark"
            @click="agregarProducto"
            >
            Agregar al carrito
            </button>
      </div>

    </div>

  </div>

</template>