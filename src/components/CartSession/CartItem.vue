<script setup lang="ts">
import type { CartItem } from '@/stores/cart';

const props = defineProps<{
    item: CartItem;
}>();

const item = props.item;

const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
});

const formatCurrency = (value: number) => currencyFormatter.format(value);
</script>
<template>
    <v-list-item>
        <v-list-item-title class="font-weight-medium">{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>
            {{ item.quantity }} × {{ formatCurrency(item.price) }} = 
            <span class="text-primary font-weight-bold">{{ formatCurrency(item.quantity * item.price) }}</span>
        </v-list-item-subtitle>
    </v-list-item>
</template>