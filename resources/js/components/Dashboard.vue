<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title
                        >Welcome, {{ authStore.user?.name }}!</v-card-title
                    >
                    <v-card-text>
                        <p>You are logged in as {{ authStore.user?.email }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();
</script>
