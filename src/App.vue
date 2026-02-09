<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
    <v-app>
        <v-app-bar>
            <RouterLink
                style="
                    text-decoration: none;
                    color: inherit;
                    display: flex;
                    align-items: center;
                    margin-left: 8px;
                    gap: 16px;
                "
                to="/shopping-cart/current"
            >
                <v-avatar image="/icons/128.png" size="64"></v-avatar>
                <h5
                    class="font-weight-black text-h4"
                    style="display: inline-block"
                >
                    Shopping Cart
                </h5>
            </RouterLink>

            <template v-slot:append>
                <v-btn
                    icon="mdi-history"
                    @click="router.push('/shopping-cart/history')"
                ></v-btn>
            </template>
        </v-app-bar>
        <v-main>
            <RouterView />
        </v-main>
    </v-app>
</template>
