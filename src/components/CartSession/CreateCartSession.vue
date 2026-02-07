<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useSessionStore } from '@/stores/session.ts';

const sessionStore = useSessionStore();
const form = reactive({
  name: '',
  valid: false,
});

const formRef = ref(null);

async function createSession() {
  const { valid } = await formRef.value.validate();
  if (valid && form.name) {
    sessionStore.setSession(form.name);
  }
}
</script>

<template>
  <v-form ref="formRef" v-model="form.valid" @submit.prevent="createSession">
      <v-card>
<v-card-title>Create Cart Session</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="form.name"
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
        :disabled="!form.valid"
      >
        Start Shopping
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</template>