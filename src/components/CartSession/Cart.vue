<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts';
import { useSessionStore } from '@/stores/session.ts';
import CartItem from './CartItem.vue';

const cartStore = useCartStore();
const sessionStore = useSessionStore();

</script>
<template>
    <v-card>
        <v-card-title>Shopping on {{ sessionStore.sessionName }}</v-card-title>
        <v-card-text>
            <v-list>
                <v-list-item>   
                    <template v-for="item in cartStore.items" :key="item.name">
                        <CartItem :item="item" />
                    </template>
                </v-list-item>
            </v-list>     
        </v-card-text>
    </v-card>
  
</template>