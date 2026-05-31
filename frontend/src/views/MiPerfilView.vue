<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import {
  obtenerPerfilCliente,
  actualizarPerfilCliente
} from "../services/clientes.service";

const cliente = ref<any>({
  telefono: "",
  nombres: "",
  apellidos: "",
  dpi: "",
  nit: "",
  fecha_nacimiento: ""
});

const router = useRouter();

const cargarPerfil = async () => {

  try {

    const usuario = JSON.parse(
      localStorage.getItem("usuario") || "{}"
    );

    const perfil =
      await obtenerPerfilCliente(
        usuario.id_usuario
      );

    cliente.value = perfil;

  } catch (error) {

    console.log(error);

  }

};

const guardarPerfil = async () => {

  try {

    await actualizarPerfilCliente(
      cliente.value.id_cliente,
      cliente.value
    );

    alert(
      "Perfil actualizado correctamente"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Error al actualizar perfil"
    );

  }

};

onMounted(() => {

  cargarPerfil();

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

    <div class="row justify-content-center">

      <div class="col-md-8">

        <div class="card shadow border-0">

          <div class="card-body p-4">

            <h2 class="mb-4">
              Mi Perfil
            </h2>

            <div class="row">

              <div class="col-md-6 mb-3">

                <label class="form-label">
                  Nombres
                </label>

                <input
                  type="text"
                  class="form-control"
                  v-model="cliente.nombres"
                />

              </div>

              <div class="col-md-6 mb-3">

                <label class="form-label">
                  Apellidos
                </label>

                <input
                  type="text"
                  class="form-control"
                  v-model="cliente.apellidos"
                />

              </div>

              <div class="col-md-6 mb-3">

                <label class="form-label">
                  Teléfono
                </label>

                <input
                  type="text"
                  class="form-control"
                  v-model="cliente.telefono"
                />

              </div>

              <div class="col-md-6 mb-3">

                <label class="form-label">
                  DPI
                </label>

                <input
                  type="text"
                  class="form-control"
                  v-model="cliente.dpi"
                />

              </div>

              <div class="col-md-6 mb-3">

                <label class="form-label">
                  NIT
                </label>

                <input
                  type="text"
                  class="form-control"
                  v-model="cliente.nit"
                />

              </div>

              <div class="col-md-6 mb-4">

                <label class="form-label">
                  Fecha nacimiento
                </label>

                <input
                  type="date"
                  class="form-control"
                  v-model="cliente.fecha_nacimiento"
                />

              </div>

            </div>

            <button
              class="btn btn-primary"
              @click="guardarPerfil"
            >
              Guardar cambios
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>