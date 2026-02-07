<script setup lang="ts">
import type { CartItem } from '@/stores/cart';

const props = defineProps<{
    item: CartItem;
}>();

const item = props.item;
</script>
<template>
    <v-list-item>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.quantity }}</v-list-item-subtitle>
    </v-list-item>
</template>