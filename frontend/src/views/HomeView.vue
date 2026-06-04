<script setup lang="ts">
import { onMounted, ref, computed } from "vue";

import { obtenerProductos } from "../services/productos.service";
import { obtenerCategorias } from "../services/categorias.service";
import { agregarAlCarrito } from "../services/carrito.service";

const productos = ref<any[]>([]);
const categorias = ref<any[]>([]);

const busqueda = ref("");
const categoriaSeleccionada = ref("");
const ordenSeleccionado = ref("");

const productosFiltrados = computed(() => {
  let resultado = productos.value.filter((producto: any) => {
    const coincideBusqueda =
      producto.nombre_producto
        .toLowerCase()
        .includes(busqueda.value.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada.value === "" ||
      producto.categoria === categoriaSeleccionada.value;

    return coincideBusqueda && coincideCategoria;
  });

  if (ordenSeleccionado.value === "precio-menor") {
    resultado.sort((a: any, b: any) =>
      Number(a.precio) - Number(b.precio)
    );
  }

  if (ordenSeleccionado.value === "precio-mayor") {
    resultado.sort((a: any, b: any) =>
      Number(b.precio) - Number(a.precio)
    );
  }

  if (ordenSeleccionado.value === "nombre") {
    resultado.sort((a: any, b: any) =>
      a.nombre_producto.localeCompare(b.nombre_producto)
    );
  }

  return resultado;
});

const seleccionarCategoria = (categoria: string) => {
  categoriaSeleccionada.value = categoria;
};

const agregarProducto = (producto: any) => {
  agregarAlCarrito(producto);
  alert("Producto agregado al carrito");
};

onMounted(async () => {
  productos.value = await obtenerProductos();
  categorias.value = await obtenerCategorias();
});
</script>

<template>
  <div class="home-tienda">

    <div class="container py-4">

      <div class="row">

        <!-- CATEGORÍAS -->
        <div class="col-md-3">

          <div class="card shadow-sm border-0 categorias-card">
            <div class="card-header fw-bold bg-white">
              Categorías
            </div>

            <button
              class="categoria-btn"
              :class="{ activo: categoriaSeleccionada === '' }"
              @click="seleccionarCategoria('')"
            >
              TODO
            </button>

            <button
              v-for="categoria in categorias"
              :key="categoria.id_categoria"
              class="categoria-btn"
              :class="{ activo: categoriaSeleccionada === categoria.nombre_categoria }"
              @click="seleccionarCategoria(categoria.nombre_categoria)"
            >
              {{ categoria.nombre_categoria }}
            </button>
          </div>

        </div>

        <!-- PRODUCTOS -->
        <div class="col-md-9">

          <div class="d-flex justify-content-between align-items-center mb-3">

            <strong>
              {{ productosFiltrados.length }} artículos encontrados
            </strong>

            <div class="d-flex gap-2">

              <input
                type="text"
                class="form-control"
                placeholder="Buscar..."
                v-model="busqueda"
              />

              <select
                class="form-select"
                v-model="ordenSeleccionado"
              >
                <option value="">
                  Ordenar por
                </option>

                <option value="precio-menor">
                  Precios más bajos
                </option>

                <option value="precio-mayor">
                  Precios más altos
                </option>

                <option value="nombre">
                  Nombre A-Z
                </option>
              </select>

            </div>

          </div>

          <hr />

          <div class="row g-4">

            <div
              class="col-md-4"
              v-for="producto in productosFiltrados"
              :key="producto.id_producto"
            >

              <div class="card producto-card h-100">

                <div class="producto-img-container">
                  <img
                    :src="`https://supernova-production-ff0a.up.railway.app/img/${producto.imagen}`"
                    class="producto-img"
                  />
                </div>

                <div class="card-body d-flex flex-column">

                  <h5 class="precio">
                    Q {{ Number(producto.precio).toFixed(2) }}
                  </h5>

                  <p class="nombre-producto">
                    {{ producto.nombre_producto }}
                  </p>

                  <p class="text-muted descripcion">
                    {{ producto.descripcion }}
                  </p>

                  <div class="mt-auto d-flex justify-content-between">

                    <button
                      class="btn btn-success btn-sm"
                      @click="agregarProducto(producto)"
                    >
                      Agregar
                    </button>

                    <RouterLink
                      :to="`/producto/${producto.id_producto}`"
                      class="btn btn-primary btn-sm"
                    >
                      Detalles
                    </RouterLink>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div
            v-if="productosFiltrados.length === 0"
            class="text-center text-muted py-5"
          >
            <i class="bi bi-search display-4"></i>

            <h4 class="mt-3">
              No se encontraron productos
            </h4>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
.home-tienda {
  background: #f5f6f8;
  min-height: 100vh;
}

.categorias-card {
  position: sticky;
  top: 20px;
}

.categoria-btn {
  width: 100%;
  border: none;
  background: white;
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
}

.categoria-btn:hover {
  background: #f1f5f9;
}

.categoria-btn.activo {
  background: #0d6efd;
  color: white;
  font-weight: bold;
}

.producto-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
}

.producto-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.producto-img-container {
  height: 210px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}

.producto-img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  padding: 15px;
}

.precio {
  font-size: 18px;
  color: #212529;
  margin-bottom: 6px;
}

.nombre-producto {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
}

.descripcion {
  font-size: 13px;
  min-height: 38px;
}
</style>