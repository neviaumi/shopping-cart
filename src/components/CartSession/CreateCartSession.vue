<script setup lang="ts">
import { ref } from 'vue';
import { useSessionStore } from '@/stores/session.ts';

const sessionStore = useSessionStore();
const name = ref('');
const valid = ref(false);

function createSession() {
  if (name.value) {
    sessionStore.setSession(name.value);
  }
}
</script>

<template>
  <v-form v-model="valid" @submit.prevent="createSession">
    <v-card-text>
      <v-text-field
        v-model="name"
        label="Session Name"
        required
        :rules="[v => !!v || 'Name is required']"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        type="submit"
        :disabled="!valid"
      >
        Start Shopping
      </v-btn>
    </v-card-actions>
  </v-form>
</template>