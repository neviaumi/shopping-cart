<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore, type CartItem } from '../../stores/cart.ts';

const props = defineProps<{
    item: CartItem;
}>();

const cartStore = useCartStore();
const isEditing = ref(false);
const editForm = ref({ ...props.item });

const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

const toggleEdit = () => {
    editForm.value = { ...props.item };
    isEditing.value = true;
};

const handleSave = () => {
    cartStore.updateItem({ ...editForm.value });
    isEditing.value = false;
};

const handleDelete = () => {
    cartStore.removeItem(props.item);
};

</script>
<template>
    <!-- Display Mode -->
    <v-list-item v-if="!isEditing" class="py-2" :title="item.name">
        <template v-slot:subtitle>
            {{ item.quantity }} × {{ formatCurrency(item.price) }} = 
            <span class="text-primary font-weight-bold">{{ formatCurrency(item.quantity * item.price) }}</span>
        </template>
        
        <template v-slot:append>
            <v-btn icon="mdi-pencil-outline" variant="text" size="small" color="grey-darken-1" @click="toggleEdit" title="Update"></v-btn>
            <v-btn icon="mdi-delete-outline" variant="text" size="small" color="error" @click="handleDelete" title="Delete"></v-btn>
        </template>
    </v-list-item>

    <!-- Edit Mode -->
    <v-list-item v-else class="py-2">
        <v-row dense align="center">
            <v-col cols="3">
                <v-text-field
                    v-model.number="editForm.name"
                    label="Name"
                    type="text"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-text-field
                    v-model.number="editForm.price"
                    label="Price"
                    type="number"
                    inputmode="decimal"
                    step="0.01"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-text-field
                    v-model.number="editForm.quantity"
                    label="Qty"
                    type="number"
                    inputmode="numeric"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="3" class="text-right">
                <v-btn color="success" size="small" @click="handleSave" block>Save</v-btn>
            </v-col>
        </v-row>
    </v-list-item>
</template>