<template>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12" rounded="lg">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title class="text-h5 font-weight-bold">
                Welcome Back
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
  
            <v-card-text class="pa-6">
              <v-form @submit.prevent="handleLogin" class="mt-4">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  type="email"
                  prepend-inner-icon="mdi-email"
                  outlined
                  rounded
                  required
                  class="mb-4"
                ></v-text-field>
  
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  outlined
                  rounded
                  required
                  class="mb-2"
                ></v-text-field>
  
                <!-- <div class="text-right mb-6">
                  <v-btn text small color="primary">Forgot password?</v-btn>
                </div> -->
  
                <v-btn
                  type="submit"
                  color="primary"
                  :loading="loading"
                  block
                  x-large
                  rounded
                  class="mt-2 mb-4"
                  elevation="2"
                >
                  <v-icon left>mdi-login</v-icon>
                  Login
                </v-btn>
  
                <v-alert
                  v-if="error"
                  type="error"
                  dense
                  outlined
                  class="mt-4"
                >
                  {{ error }}
                </v-alert>
  
                <v-divider class="my-6"></v-divider>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../../store/auth";
  
  const router = useRouter();
  const authStore = useAuthStore();
  const loading = ref(false);
  const error = ref(null);
  
  const form = ref({
    email: "",
    password: "",
  });
  
  const handleLogin = async () => {
    loading.value = true;
    error.value = null;
  
    try {
      await authStore.login(form.value);
      router.push("/dashboard");
    } catch (err) {
      error.value =
        err.response?.data?.error || "Login failed. Please try again.";
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .v-card {
    transition: all 0.3s ease;
  }
  
  .v-card:hover {
    transform: translateY(-2px);
  }
  
  .v-text-field--rounded > .v-input__control > .v-input__slot {
    padding: 0 12px !important;
  }
  </style>