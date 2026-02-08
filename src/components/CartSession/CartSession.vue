<script setup lang="ts">
import {useSessionStore} from "../../stores/session.ts";
  import { computed } from 'vue'
  import CreateCartSession from "./CreateCartSession.vue";
  import Cart from "./Cart.vue";

const sessionStore = useSessionStore();
const isCurrentSessionConfigured = computed(() => sessionStore.isSessionSet)
</script>

<template>

    <div v-if="!isCurrentSessionConfigured">
        <CreateCartSession/>
    </div>
    <div v-else>
        <Cart/>
    </div>
    
</template>