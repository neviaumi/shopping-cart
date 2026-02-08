<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart.ts';
import { useSessionStore } from '@/stores/session.ts';
import CartItem from './CartItem/CartItem.vue';
import AddCartItemForm from './AddCartItemForm.vue';
import { formatCurrency, formatDate } from "@/utils/formatting.ts"
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();
const sessionStore = useSessionStore();
const sessionCreatedAt = computed(() => {
    return formatDate(new Date(sessionStore.sessionCreatedAt));
});

const newItemForm = ref({
    name: '',
    price: null,
    quantity: 1
});

const handleCheckout = () => {
    cartStore.checkout();
    router.push('/shopping-cart/history');
}


</script>
<template>
    <v-card class="d-flex flex-column" style="height: 100vh;">
        <v-card-title>
            <v-container>
                <v-row>
                    <v-col   class="text-h4">
                        {{ sessionStore.sessionName }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col  class="text-h4">
                        @ {{ sessionCreatedAt }}
                    </v-col>
                </v-row>
            </v-container>
 
        </v-card-title>
        <v-card-text class="flex-grow-1 overflow-y-auto">
            <AddCartItemForm />

            <v-divider class="mb-6"></v-divider>

            <v-container v-if="cartStore.items.length > 0" class="position-sticky top-0 bg-surface" style="z-index: 5;">
                <v-row>
                    <v-col class="text-h5 text-left">
                        Subtotal
                    </v-col>
                    <v-col class="text-h5 font-weight-bold text-right">
                        {{ formatCurrency(cartStore.subTotal) }}
                    </v-col>
                </v-row>
                <v-row >
                    <v-col>
                        <v-btn color="primary" block @click="handleCheckout">Checkout</v-btn>
                    </v-col>
                </v-row>
            </v-container>

            <!-- List -->
            <v-list v-if="cartStore.items.length > 0">
                <template v-for="item in cartStore.items" :key="item.id">
                    <CartItem :item="item" />
                </template>
            </v-list>
              <v-empty-state v-else
              style="min-height: initial;"
    icon="mdi-cart-outline"
    title="Your cart is empty."
    headline="Cart is empty"
  ></v-empty-state>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.border-dashed {
    border: 2px dashed #ccc;
    background-color: #fafafa;
}
</style>