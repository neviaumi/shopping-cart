<script setup lang="ts">
import CartSession from "./components/CartSession/CartSession.vue";
</script>

<template>
    <v-app><v-app-bar>

  <v-app-bar-title>Shopping Cart</v-app-bar-title>

  <template v-slot:append>
    <v-btn icon="mdi-history"></v-btn>
  </template>
</v-app-bar>
<v-main>
    <v-container>
<CartSession/>

    </v-container>
</v-main>
</v-app>

</template>

<style scoped></style>
