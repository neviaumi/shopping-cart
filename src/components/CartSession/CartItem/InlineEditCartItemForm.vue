<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore, type CartItem } from '../../../stores/cart.ts';
const emit = defineEmits(['update']);
const props = defineProps<{
    item: CartItem;
}>();

const cartStore = useCartStore();
const editForm = ref({ ...props.item });

const handleUpdateItem = () => {
    cartStore.updateItem({ ...editForm.value });
    emit('update');
};


</script>
<template>
                <v-form @submit.prevent="handleUpdateItem" class="mb-6">
        <v-row dense align="center">
            <v-col cols="9">
                <v-row>
                            <v-col >
                <v-text-field
                    v-model.number="editForm.name"
                    name="item.name"
                    autocomplete="off"
                    label="Name"
                    type="text"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col></v-row>
            <v-row>
                <v-col>
                <v-text-field
                    v-model.number="editForm.price"
                    name="item.price"
                    autocomplete="off"
                    label="Price"
                    type="number"
                    inputmode="decimal"
                    step="0.01"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            </v-row>
            <v-row>
            <v-col>
                <v-text-field
                    v-model.number="editForm.quantity"
                    name="item.quantity"
                    autocomplete="off"
                    label="Qty"
                    type="number"
                    inputmode="numeric"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            </v-row>
            </v-col>
            <v-col cols="3" class="text-right">
                <v-btn color="success" size="small" type="submit" block>Save</v-btn>
            </v-col>
        </v-row>
        </v-form>
</template>