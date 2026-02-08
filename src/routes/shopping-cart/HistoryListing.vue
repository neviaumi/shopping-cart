<script setup lang="ts">
import { useHistoryStore } from "@/stores/history.ts";
import { formatCurrency, formatDate } from "@/utils/formatting.ts"

const historyStore = useHistoryStore();
const sessions = historyStore.getSessionsInfo(historyStore.getArchivedSessions());
</script>

<template>
  <v-card>
    <v-card-title>
      History Listing
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="session in sessions" :key="session.id">
          <v-list-item-title>{{ session.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ formatDate(new Date(session.createdAt)) }}</v-list-item-subtitle>
          <template v-slot:append>
            {{ formatCurrency(session.subTotal) }}
        </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>