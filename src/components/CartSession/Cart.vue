<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '../../stores/cart.ts';
import { useSessionStore } from '../../stores/session.ts';
import CartItem from './CartItem/CartItem.vue';
import AddCartItemForm from './AddCartItemForm.vue';

const cartStore = useCartStore();
const sessionStore = useSessionStore();
const sessionCreatedAt = computed(() => {
    return new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
        hour12: false
    }).format(new Date(sessionStore.sessionCreatedAt));
});

const newItemForm = ref({
    name: '',
    price: null,
    quantity: 1
});

const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
});

const formatCurrency = (value: number) => currencyFormatter.format(value);



</script>
<template>
    <v-card>
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
        <v-card-text class="position-relative">
            <AddCartItemForm />

            <v-divider class="mb-6"></v-divider>

            <v-container class="position-sticky top-0">
                <v-row>
                    <v-col class="text-h5 text-left">
                        Subtotal
                    </v-col>
                    <v-col class="text-h5 font-weight-bold text-right">
                        {{ formatCurrency(cartStore.subTotal) }}
                    </v-col>
                </v-row>
            </v-container>

            <!-- List -->
            <v-list v-if="cartStore.items.length > 0">
                <template v-for="item in cartStore.items" :key="item.id">
                    <CartItem :item="item" />
                </template>
            </v-list>
            <div v-else class="text-center py-8 text-grey-darken-1 border-dashed rounded">
                <v-icon icon="mdi-cart-outline" size="48" class="mb-2"></v-icon>
                <div>Cart is empty</div>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.border-dashed {
    border: 2px dashed #ccc;
    background-color: #fafafa;
}
</style>