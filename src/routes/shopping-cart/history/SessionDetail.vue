<script setup lang="ts">
import { computed } from 'vue';
import { useHistoryStore } from '@/stores/history.ts';
import { formatCurrency, formatDate } from "@/utils/formatting.ts";

const props = defineProps<{ sessionId: string }>();
const historyStore = useHistoryStore();
const sessionId = props.sessionId;

const session = historyStore.getSessionDetail(sessionId);

</script>

<template>
    <v-card class="d-flex flex-column" style="height: 100vh;">
        <v-card-title>
            <v-container>
                <v-row>
                    <v-col class="text-h4">
                        {{ session.name }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text-h4">
                         @ {{ formatDate(session.createdAt) }}
                    </v-col>
                </v-row>
            </v-container>
        </v-card-title>

        <v-card-text class="flex-grow-1 overflow-y-auto">
            <v-container class="position-sticky top-0 bg-surface" style="z-index: 5;">
                <v-row>
                    <v-col class="text-h5 text-left">
                        Total Amount
                    </v-col>
                    <v-col class="text-h5 font-weight-bold text-right">
                        {{ formatCurrency(session.subTotal) }}
                    </v-col>
                </v-row>
            </v-container>

            <v-divider class="mb-6"></v-divider>

            <v-list v-if="session.items.length > 0">
                <v-list-item v-for="item in session.items" :key="item.id" class="px-0">

                    <v-list-item-title class="font-weight-bold">
                        {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
            {{ item.quantity }} × {{ formatCurrency(item.price) }} = 
            <span class="text-primary font-weight-bold">{{ formatCurrency(item.quantity * item.price) }}</span>                    </v-list-item-subtitle>

                    <template v-slot:append>
                        <div class="text-body-1 font-weight-medium">
                            {{ formatCurrency(item.price * item.quantity) }}
                        </div>
                    </template>
                </v-list-item>
            </v-list>
            
            <v-empty-state v-else
                style="min-height: initial;"
                icon="mdi-cart-outline"
                title="No items in this session."
                headline="Empty Archive"
            ></v-empty-state>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>