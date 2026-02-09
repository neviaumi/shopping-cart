<script setup lang="ts">
import { useSessionStore } from "@/stores/session.ts";
import { computed } from "vue";
import CreateCartSession from "./components/CartSession/CreateCartSession.vue";
import Cart from "./components/CartSession/Cart.vue";
import StorageErrorBoundary from "@/components/StorageErrorBoundary.vue";
const sessionStore = useSessionStore();
const isCurrentSessionConfigured = computed(() => sessionStore.isSessionSet);
</script>

<template>
    <StorageErrorBoundary>
        <v-window>
            <v-window-item v-if="!isCurrentSessionConfigured">
                <CreateCartSession />
            </v-window-item>
            <v-window-item v-else>
                <Cart />
            </v-window-item>
        </v-window>
    </StorageErrorBoundary>
</template>
