<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '../../stores/cart.ts';
import { useSessionStore } from '../../stores/session.ts';
import CartItem from './CartItem.vue';
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
                    <v-col cols="4">
                        <v-sheet class="text-h6">At:</v-sheet>
                    </v-col>
                    <v-col  cols="8">
                        <v-sheet >{{ sessionStore.sessionName }}</v-sheet>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-sheet class="text-h6">Started</v-sheet>
                    </v-col>
                    <v-col cols="8">
                        <v-sheet >{{ sessionCreatedAt }}</v-sheet>
                    </v-col>
                </v-row>
            </v-container>
 
        </v-card-title>
        <v-card-text>
            <AddCartItemForm />

            <v-divider class="mb-6"></v-divider>

            <!-- Subtotal Section -->
            <div class="d-flex justify-space-between align-center mb-6">
                <span class="text-h6">Subtotal</span>
                <span class="text-h6 font-weight-bold">{{ formatCurrency(cartStore.subTotal) }}</span>
            </div>

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