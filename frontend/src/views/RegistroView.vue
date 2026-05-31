<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const nombre = ref("");
const correo = ref("");
const password = ref("");

const registrarUsuario = async () => {
  try {

    await axios.post(
      "https://supernova-production-ff0a.up.railway.app/api/auth/register",
      {
        nombre: nombre.value,
        correo: correo.value,
        password: password.value
      }
    );

    alert("Usuario registrado correctamente");

    router.push("/login");

  } catch (error: any) {
  console.log("ERROR REGISTRO:", error.response?.data || error);

  alert(
    error.response?.data?.mensaje ||
    "Error al registrar usuario"
  );
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
              Crear cuenta
            </h2>

            <form @submit.prevent="registrarUsuario">
              <div class="mb-3">
                <label class="form-label">
                  Nombre
                </label>

                <input
                  type="text"
                  class="form-control"
                  v-model="nombre"
                  required
                >
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
                  required
                >
              </div>

              <button
                class="btn btn-dark w-100"
                type="submit"
              >
                Registrarme
              </button>

              <div class="text-center mt-3">
                <RouterLink to="/login">
                  Ya tengo cuenta
                </RouterLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>