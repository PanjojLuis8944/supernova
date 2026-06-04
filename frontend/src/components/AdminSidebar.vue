<script setup lang="ts">
</script>

<template>

  <div class="admin-sidebar">

    <div class="sidebar-logo">

      <i class="bi bi-stars"></i>

      <span>Supernova</span>

    </div>

    <RouterLink
      to="/admin/dashboard"
      class="sidebar-link"
    >
      <i class="bi bi-speedometer2"></i>
      Dashboard
    </RouterLink>

    <RouterLink
      to="/admin/productos"
      class="sidebar-link"
    >
      <i class="bi bi-box-seam"></i>
      Productos
    </RouterLink>

    <RouterLink
      to="/admin/productos/nuevo"
      class="sidebar-link"
    >
      <i class="bi bi-plus-circle"></i>
      Nuevo Producto
    </RouterLink>

    <RouterLink
      to="/admin/pedidos"
      class="sidebar-link"
    >
      <i class="bi bi-cart-check"></i>
      Pedidos
    </RouterLink>

    <RouterLink
      to="/admin/usuarios"
      class="sidebar-link"
    >
      <i class="bi bi-people"></i>
      Usuarios
    </RouterLink>

    <RouterLink
      to="/"
      class="sidebar-link"
    >
      <i class="bi bi-shop"></i>
      Ir a Tienda
    </RouterLink>

  </div>

</template>

<style scoped>

.admin-sidebar {
  width: 240px;
  min-height: 100vh;
  background: #111827;
  padding: 20px;
}

.sidebar-logo {
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
}

.sidebar-link {
  display: block;
  color: #d1d5db;
  text-decoration: none;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.sidebar-link:hover {
  background: #2563eb;
  color: white;
}

.router-link-active {
  background: #2563eb;
  color: white;
}

</style>