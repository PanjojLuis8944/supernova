<script setup lang="ts">

import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

</script>

<template>

  <Navbar />

  <div class="main-content">

    <RouterView />

    <Footer />

  </div>

</template>

<style>

.main-content {
  margin-top: 70px;
}

</style>