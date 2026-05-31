<script setup lang="ts">

import { ref } from "vue";

import axios from "axios";

import { useRouter } from "vue-router";

const router = useRouter();

const correo = ref("");
const password = ref("");

const iniciarSesion = async () => {

  try {

    const response = await axios.post(
  "http://localhost:3000/api/auth/login",
  {
    correo: correo.value,
    password: password.value
  }
);

    localStorage.setItem(
      "usuario",
      JSON.stringify(response.data.usuario)
    );

    alert("Inicio de sesión exitoso");

    router.push("/");

  } catch (error) {

    alert("Credenciales incorrectas");

  }

};

</script>

<template>

  <div class="container mt-5">

    <div class="row justify-content-center">

      <div class="col-md-5">

        <div class="card shadow border-0">

          <div class="card-body p-4">

            <h2 class="text-center mb-4">
              Iniciar Sesión
            </h2>

            <form @submit.prevent="iniciarSesion">

              <div class="mb-3">

                <label class="form-label">
                  Correo
                </label>

                <input
                  type="email"
                  class="form-control"
                  v-model="correo"
                >

              </div>

              <div class="mb-3">

                <label class="form-label">
                  Contraseña
                </label>

                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                >

              </div>

              <button
                class="btn btn-dark w-100"
                type="submit"
              >
                Ingresar
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>