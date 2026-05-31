<script setup lang="ts">
import {
  ref,
  onMounted
} from "vue";

import { useRouter } from "vue-router";

import { RouterLink } from "vue-router";

import {
  obtenerUsuarios,
  cambiarRolUsuario,
  eliminarUsuario
} from "../services/usuarios.service";

const usuarios = ref<any[]>([]);
const router = useRouter();

const cargarUsuarios = async () => {

  try {

    usuarios.value =
      await obtenerUsuarios();

  } catch (error) {

    console.log(error);

  }

};

const cambiarRol = async (
  idUsuario: number,
  idRol: number
) => {

  try {

    await cambiarRolUsuario(
      idUsuario,
      idRol
    );

    alert(
      "Rol actualizado correctamente"
    );

    cargarUsuarios();

  } catch (error) {

    console.log(error);

    alert(
      "Error al actualizar rol"
    );

  }

};

const eliminar = async (
  idUsuario: number
) => {

  try {

    const confirmar =
      confirm(
        "¿Eliminar usuario?"
      );

    if (!confirmar) return;

    await eliminarUsuario(
      idUsuario
    );

    alert(
      "Usuario eliminado correctamente"
    );

    cargarUsuarios();

  } catch (error) {

    console.log(error);

    alert(
      "Error al eliminar usuario"
    );

  }

};

onMounted(() => {
  cargarUsuarios();
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

    <h1 class="mb-4">
      Administración de Usuarios
    </h1>

    <div class="mb-3">

  <RouterLink
    to="/admin/usuarios/nuevo"
    class="btn btn-success"
  >
    Nuevo usuario
  </RouterLink>

</div>

    <div class="table-responsive">

      <table
        class="table table-bordered table-hover"
      >

        <thead class="table-dark">

          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>

        </thead>

        <tbody>

          <tr
            v-for="usuario in usuarios"
            :key="usuario.id_usuario"
          >

            <td>
              {{ usuario.id_usuario }}
            </td>

            <td>
              {{ usuario.nombre }}
            </td>

            <td>
              {{ usuario.correo }}
            </td>

            <td>

              <select
                class="form-select"
                :value="usuario.id_rol"
                @change="
                  cambiarRol(
                    usuario.id_usuario,
                    Number(
                      ($event.target as HTMLSelectElement).value
                    )
                  )
                "
              >

                <option value="1">
                  Administrador
                </option>

                <option value="2">
                  Cliente
                </option>

                <option value="3">
                  Usuario
                </option>

              </select>

            </td>

            <td>

              <span
                class="badge"
                :class="
                  usuario.estado
                    ? 'bg-success'
                    : 'bg-danger'
                "
              >
                {{
                  usuario.estado
                    ? "Activo"
                    : "Inactivo"
                }}
              </span>

            </td>

            <td>

              <button
                class="btn btn-danger btn-sm"
                @click="
                  eliminar(
                    usuario.id_usuario
                  )
                "
              >
                Eliminar
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>