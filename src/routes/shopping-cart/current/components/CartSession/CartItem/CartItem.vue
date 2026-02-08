<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore, type CartItem } from '@/stores/cart.ts';
import InlineEditCartItemForm from './InlineEditCartItemForm.vue';
import { formatCurrency } from "@/utils/formatting.ts"

const props = defineProps<{
    item: CartItem;
}>();

const cartStore = useCartStore();
const isEditing = ref(false);

const toggleEdit = () => {
    isEditing.value = true;
};

const afterUpdate = () => {
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
        <InlineEditCartItemForm :item="item" @update="afterUpdate" />
    </v-list-item>
    
    
</template>