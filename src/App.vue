<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
    <v-app><v-app-bar>

  <v-app-bar-title><RouterLink style='text-decoration: none; color: inherit;' to="/shopping-cart/current">Shopping Cart</RouterLink></v-app-bar-title>

  <template v-slot:append>
    <v-btn icon="mdi-history" @click="router.push('/shopping-cart/history')"></v-btn>
  </template>
</v-app-bar>
<v-main>
    <RouterView />
</v-main>
</v-app>

</template>
