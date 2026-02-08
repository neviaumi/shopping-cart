<script setup lang="ts">
import {useSessionStore} from "../../stores/session.ts";
  import { computed } from 'vue'
  import CreateCartSession from "./CreateCartSession.vue";
  import Cart from "./Cart.vue";

const sessionStore = useSessionStore();
const isCurrentSessionConfigured = computed(() => sessionStore.isSessionSet)
</script>

<template>

    <v-window>
        <v-window-item v-if="!isCurrentSessionConfigured">
        <CreateCartSession/>
        </v-window-item>
        <v-window-item v-else>
        <Cart/>
        </v-window-item>
    </v-window>        
    
</template>