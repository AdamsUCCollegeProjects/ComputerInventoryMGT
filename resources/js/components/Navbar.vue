<template>
    <v-app-bar app color="primary" dark>
        <v-toolbar-title>Computer Inventory System</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn to="/dashboard" text>Dashboard</v-btn>
        <v-btn to="/computers" text>Computers</v-btn>
        <v-btn to="/assignments" text>Assignments</v-btn>

        <v-btn icon @click="dialog = true">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>

    <!-- Logout Confirmation Dialog -->
    <v-dialog v-model="dialog" max-width="400px">
        <v-card>
            <v-card-title class="text-h6">Confirm Logout</v-card-title>
            <v-card-text>Are you sure you want to log out?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">Cancel</v-btn>
                <v-btn color="red" text @click="confirmLogout">Logout</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

const dialog = ref(false);
const authStore = useAuthStore();

const confirmLogout = () => {
    dialog.value = false;
    console.log("logging out");
    authStore.logout();
};
</script>
