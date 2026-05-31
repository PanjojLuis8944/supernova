<script setup lang="ts">
import { ref } from "vue";

import { useRouter } from "vue-router";

import axios from "axios";

const router = useRouter();

const nombre = ref("");

const correo = ref("");

const password = ref("");

const id_rol = ref(2);

const crearUsuario = async () => {

  try {

    await axios.post(
      "https://supernova-production-ff0a.up.railway.app/api/usuarios",
      {
        nombre: nombre.value,
        correo: correo.value,
        password: password.value,
        id_rol: id_rol.value
      }
    );

    alert(
      "Usuario creado correctamente"
    );

    router.push("/admin/usuarios");

  } catch (error) {

    console.log(error);

    alert("Error al crear usuario");

  }

};
</script>

<template>
  <div class="container mt-5">

    <div class="row justify-content-center">

      <div class="col-md-6">

        <div class="card shadow border-0">

          <div class="card-body p-4">

            <h2 class="mb-4">
              Nuevo Usuario
            </h2>

            <form @submit.prevent="crearUsuario">

              <div class="mb-3">

                <label class="form-label">
                  Nombre
                </label>

                <input
                  type="text"
                  class="form-control"
                  v-model="nombre"
                  required
                />

              </div>

              <div class="mb-3">

                <label class="form-label">
                  Correo
                </label>

                <input
                  type="email"
                  class="form-control"
                  v-model="correo"
                  required
                />

              </div>

              <div class="mb-3">

                <label class="form-label">
                  Contraseña
                </label>

                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  required
                />

              </div>

              <div class="mb-4">

                <label class="form-label">
                  Rol
                </label>

                <select
                  class="form-select"
                  v-model="id_rol"
                >

                  <option :value="1">
                    Administrador
                  </option>

                  <option :value="2">
                    Cliente
                  </option>

                  <option :value="3">
                    Usuario
                  </option>

                </select>

              </div>

              <button
                type="submit"
                class="btn btn-success w-100"
              >
                Crear usuario
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>