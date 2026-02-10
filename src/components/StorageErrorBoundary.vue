<script setup>
import { ref, onErrorCaptured } from "vue";
import storage, { isStorageSetItemError } from "@/storage.ts";

const error = ref(null);

// This is the functional equivalent to React's componentDidCatch
onErrorCaptured((err) => {
    if (isStorageSetItemError(err)) {
        error.value = err;
        return false; // Prevents error from bubbling up to global handler
    }
});

function resetError() {
    storage.clear(); // Clear local storage to attempt recovery
    window.location.reload();
}
</script>

<template>
    <slot v-if="!error"></slot>
    <v-empty-state
        v-else
        icon="mdi-database-limit"
        color="error"
        title="Storage Capacity Reached"
        text="You have reached the maximum limit of shopping sessions. To continue shopping, please delete older entries.
        "
    >
        <template v-slot:actions>
            <v-btn
                color="primary"
                variant="elevated"
                prepend-icon="mdi-refresh"
                @click="resetError"
            >
                Clear & Refresh Page
            </v-btn>
        </template>
    </v-empty-state>
</template>
