<template>
  <v-app>
    <Navbar v-if="authStore.isAuthenticated" />
    
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import Navbar from './Navbar.vue';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();

onMounted(() => {
  authStore.initializeAuth();
});
</script>