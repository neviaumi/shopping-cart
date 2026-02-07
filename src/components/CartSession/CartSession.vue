<script setup lang="ts">
import {useSessionStore} from "../../stores/session.ts";
  import { computed } from 'vue'
  import CreateCartSession from "./CreateCartSession.vue";
  import Cart from "./Cart.vue";

const sessionStore = useSessionStore();
const isCurrentSessionConfigured = sessionStore.isSessionSet
 const currentTitle = computed(() => {
    if (!isCurrentSessionConfigured) {
        return "Setup Cart Session"
    } else {
        return `Shopping on ${sessionStore.sessionName}`
    }
  })
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