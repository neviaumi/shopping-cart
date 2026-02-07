<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts';
import CartItem from './CartItem.vue';
const cartStore = useCartStore();

</script>
<template>
    Cart here
    <v-list>
        <v-list-item>   
            <template v-for="item in cartStore.items" :key="item.name">
                <CartItem :item="item" />
            </template>
        </v-list-item>
    </v-list>     
</template>