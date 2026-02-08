<script setup lang="ts">
import { useHistoryStore } from "@/stores/history.ts";
import { formatCurrency, formatDate } from "@/utils/formatting.ts"
import { useRouter } from "vue-router";

const router = useRouter();
const historyStore = useHistoryStore();
const sessions = historyStore.getSessionsInfo(historyStore.getArchivedSessions());

function handleSessionClick(sessionId: string) {
    router.push(`/shopping-cart/history/${sessionId}`);
}

</script>

<template>
  <v-container>
    <v-row v-if="sessions.length === 0">
      <v-col cols="12">
        <v-empty-state
          icon="mdi-history"
          title="No history found"
          text="Your checked-out sessions will appear here."
        />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <v-card>
          <v-list lines="two" selectable="true">
            <v-list-item v-for="session in sessions" :key="session.id" @click="handleSessionClick(session.id)">
              <template v-slot:prepend>
                <v-avatar color="primary" icon="mdi-cart-check"></v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold">
                {{ session.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ formatDate(new Date(session.createdAt)) }}
              </v-list-item-subtitle>
              <template v-slot:append>
                <span class="text-h6 font-weight-black">
                  {{ formatCurrency(session.subTotal) }}
                </span>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>