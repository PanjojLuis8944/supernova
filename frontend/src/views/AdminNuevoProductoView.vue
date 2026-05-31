<script setup lang="ts">
import { ref, onMounted } from "vue";

import axios from "axios";

import { useRouter } from "vue-router";

const router = useRouter();

const categorias = ref<any[]>([]);
const marcas = ref<any[]>([]);

const producto = ref({
  id_categoria: "",
  id_marca: "",
  nombre_producto: "",
  descripcion: "",
  precio: "",
  stock: "",
  imagen: ""
});

const cargarDatos = async () => {

  const categoriasResponse = await axios.get(
    "http://localhost:3000/api/categorias"
  );

  categorias.value = categoriasResponse.data;

  const marcasResponse = await axios.get(
    "http://localhost:3000/api/marcas"
  );

  marcas.value = marcasResponse.data;

};

const guardarProducto = async () => {

  try {

    await axios.post(
      "http://localhost:3000/api/productos",
      producto.value
    );

    alert("Producto creado correctamente");

    router.push("/admin/productos");

  } catch (error) {

    alert("Error al crear producto");

  }

};

onMounted(() => {

  cargarDatos();

});
</script>

<template>

  <div class="container mt-5">

    <div class="row justify-content-center">

      <div class="col-md-8">

        <div class="card shadow border-0">

          <div class="card-body">

            <h2 class="mb-4">
              Nuevo Producto
            </h2>

            <form @submit.prevent="guardarProducto">

              <div class="mb-3">

                <label class="form-label">
                  Nombre
                </label>

                <input
                  type="text"
                  class="form-control"
                  v-model="producto.nombre_producto"
                  required
                >

              </div>

              <div class="mb-3">

                <label class="form-label">
                  Descripción
                </label>

                <textarea
                  class="form-control"
                  v-model="producto.descripcion"
                ></textarea>

              </div>

              <div class="row">

                <div class="col-md-6 mb-3">

                  <label class="form-label">
                    Precio
                  </label>

                  <input
                    type="number"
                    class="form-control"
                    v-model="producto.precio"
                    required
                  >

                </div>

                <div class="col-md-6 mb-3">

                  <label class="form-label">
                    Stock
                  </label>

                  <input
                    type="number"
                    class="form-control"
                    v-model="producto.stock"
                    required
                  >

                </div>

              </div>

              <div class="row">

                <div class="col-md-6 mb-3">

                  <label class="form-label">
                    Categoría
                  </label>

                  <select
                    class="form-select"
                    v-model="producto.id_categoria"
                    required
                  >

                    <option value="">
                      Seleccione
                    </option>

                    <option
                      v-for="categoria in categorias"
                      :key="categoria.id_categoria"
                      :value="categoria.id_categoria"
                    >
                      {{ categoria.nombre_categoria }}
                    </option>

                  </select>

                </div>

                <div class="col-md-6 mb-3">

                  <label class="form-label">
                    Marca
                  </label>

                  <select
                    class="form-select"
                    v-model="producto.id_marca"
                    required
                  >

                    <option value="">
                      Seleccione
                    </option>

                    <option
                      v-for="marca in marcas"
                      :key="marca.id_marca"
                      :value="marca.id_marca"
                    >
                      {{ marca.nombre_marca }}
                    </option>

                  </select>

                </div>

              </div>

              <div class="mb-3">

                <label class="form-label">
                  Imagen
                </label>

                <input
                  type="text"
                  class="form-control"
                  placeholder="ejemplo.jpg"
                  v-model="producto.imagen"
                >

              </div>

              <button
                class="btn btn-dark"
                type="submit"
              >
                Guardar producto
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>