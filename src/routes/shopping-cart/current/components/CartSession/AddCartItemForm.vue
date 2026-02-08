<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts';
import { ref } from 'vue';

const cartStore = useCartStore();

const newItemForm = ref({
    name: '',
    price: null,
    quantity: 1
});

const handleAddItem = () => {
    if (newItemForm.value.name.trim() && newItemForm.value.price > 0 && newItemForm.value.quantity > 0) {
        cartStore.addItem({
            name: newItemForm.value.name.trim(),
            price: Number(newItemForm.value.price),
            quantity: Number(newItemForm.value.quantity)
        });
        // Reset form immediately after successful store dispatch
        newItemForm.value = {
            name: '',
            price: 0,
            quantity: 1
        };
    }
};</script>
<template>
                <!-- Entry Form -->
            <v-form @submit.prevent="handleAddItem" class="mb-6">
                <v-container>
                <v-row dense>
                    <v-col cols="12" sm="5">
                        <v-text-field
                            v-model="newItemForm.name"
                            label="Item Name"
                            name="session.name"
                            density="compact"
                            hide-details="auto"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="3">
                        <v-text-field
                            v-model.number="newItemForm.price"
                            label="Price"
                            type="number"
                            inputmode="decimal"
                            step="0.01"
                            density="compact"
                            hide-details="auto"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="2">
                        <v-text-field
                            v-model.number="newItemForm.quantity"
                            label="Qty"
                            type="number"
                            inputmode="numeric"
                            density="compact"
                            hide-details="auto"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" class="d-flex align-center">
                        <v-btn color="primary" block height="40" type="submit">Add</v-btn>
                    </v-col>
                </v-row></v-container>
            </v-form>
</template>